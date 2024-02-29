const jwt = require("jsonwebtoken");
const express = require("express");
const mysql = require("mysql");
const app = express();
const multer = require("multer");
const path = require('path');
app.use(express.json());
app.listen(8080, () => {
  console.log("Server running on port 8080");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt); 
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Hanya Gambar Yang Diperbolehkan!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nutech_test",
});

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateEmail = (req, res, next) => {
  const email = req.body.email;
  if (!email || !isEmailValid(email)) {
    return res.status(500).json({
      status: "102",
      message: "Parameter email tidak sesuai format",
      data: "null",
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const password = req.body.password;
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password harus memiliki setidaknya 8 karakter" });
  }
  next();
};

app.post("/registration", validateEmail, validatePassword, (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  db.query(
    `INSERT INTO users (email, first_name, last_name, password) VALUES ('${email}','${first_name}','${last_name}','${password}')`,
    (err, result) => {
      if (err) throw err;
      res.status(200).json({
        status: "0",
        message: "Registrasi berhasil silahkan login",
        data: req.body,
      });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({
          status: "103",
          message: "Parameter email tidak sesuai format ",
          data: "null",
        });
      }
      if (result.length == 0) {
        res.status(401).json({
          status: "102",
          message: "Username atau password salah!",
          data: "null",
        });
      } else {
        const user = result[0];
        const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "12h" });
        res.cookie("token", token, {
          maxAge: 43200000,
          sameSite: "strict",
          path: "/",
        });
        res
          .status(200)
          .json({ status: "0", message: "Login Sukses", data: token });
      }
    }
  );
});

app.get("/profile", (req, res) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "108",
      message: "Token tidak valid atau kadarluarsa!",
      data: null,
    });
  }
  const token = authHead.substring(7);
  jwt.verify(token, "secret", (err, decoded) => {
    const id = decoded.id;
    db.query(
      "SELECT email, first_name, last_name, profile_image FROM users WHERE id = '" +
        id +
        "'",
      (err, result) => {
        if (err) {
          res
            .status(401)
            .json({ status: "103", message: "Bad Request!", data: "null" });
        } else {
          res
            .status(200)
            .json({ status: "0", message: "Sukses", data: result });
        }
      }
    );
  });
});

app.put("/profile/update", (req, res) => {
  const authHead = req.headers.authorization;
  const { first_name, last_name } = req.body;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "108",
      message: "Token tidak valid atau kadarluarsa!",
      data: null,
    });
  }
  const token = authHead.substring(7);
  jwt.verify(token, "secret", (err, decoded) => {
    const id = decoded.id;
    let dataExtract;
    db.query(
      "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?",
      [first_name, last_name, id],
      (err, result) => {
        if (err) {
          res
            .status(401)
            .json({ status: "103", message: "Bad Request!", data: "null" });
        } else {
          db.query(
            "SELECT email, first_name, last_name, profile_image FROM users WHERE id = '" +
              id +
              "'",
            (err, result) => {
              if (err) {
                res.status(401).json({
                  status: "103",
                  message: "Bad Request!",
                  data: "null",
                });
              } else {
                dataExtract = result;
                res
                  .status(200)
                  .json({ status: "0", message: "Sukses", data: dataExtract });
              }
            }
          );
        }
      }
    );
  });
});

app.get("/balance", (req, res) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "108",
      message: "Token tidak valid atau kadarluarsa!",
      data: null,
    });
  }
  const token = authHead.substring(7);
  jwt.verify(token, "secret", (err, decoded) => {
    const id = decoded.id;
    db.query(
      "SELECT balance FROM users WHERE id = '" + id + "'",
      (err, result) => {
        if (err) {
          res
            .status(401)
            .json({ status: "103", message: "Bad Request!", data: "null" });
        } else {
          res
            .status(200)
            .json({ status: "0", message: "Sukses", data: result });

        }
      }
    );
  });
});

app.post("/topup", (req, res) => {
  const authHead = req.headers.authorization;
  const { top_up_amount } = req.body;

  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "108",
      message: "Token tidak valid atau kadarluarsa!",
      data: null,
    });
  }

  const token = authHead.substring(7);
  jwt.verify(token, "secret", (err, decoded) => {
    if (top_up_amount <= 0) {
      return res.status(400).json({
        status: "103",
        message:
          "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        data: null,
      });
    }

    const id = decoded.id;
    let balanceResult;
    let email;
    const invoice_number = `INV` + Date.now() + ``;
    const description = "TOP_UP_BALANCE";
    const transaction_type = "TOPUP";
    const created_on = Date.now();

    db.query(
      "SELECT balance, email FROM users WHERE id = '" + id + "'",
      (err, result) => {
        if (err) {
          return res.status(401).json({
            status: "103",
            message: "Bad Request!",
            data: null,
          });
        }

        if (result.length > 0) {
          balanceResult = result[0].balance;
          email = result[0].email;
        }

        const balanceCalc = parseInt(balanceResult) + parseInt(top_up_amount);

        db.query(
          "UPDATE users SET balance = ? WHERE id = ?",
          [balanceCalc, id],
          (err, result) => {
            if (err) {
              return res.status(401).json({
                status: "103",
                message: "Bad Request Top Up!",
                data: null,
              });
            }

            db.query(
              `INSERT INTO transaction (email, invoice_number, description, transaction_type, total_amount, created_on) VALUES ('${email}','${invoice_number}','${description}','${transaction_type}','${parseInt(
                top_up_amount
              )}','${created_on}');`,
              (err, result) => {
                if (err) {
                  console.log(err);
                  return res.status(401).json({
                    status: "103",
                    message: "Token tidak tidak valid atau kadaluwarsa",
                    data: null,
                  });
                }

                return res.status(200).json({
                  status: "0",
                  message: "Sukses",
                  data: {
                    balance: balanceCalc,
                  },
                });
              }
            );
          }
        );
      }
    );
  });
});

app.get("/transaction/history", (req, res) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "108",
      message: "Token tidak valid atau kadarluarsa!",
      data: null,
    });
  }

  const token = authHead.substring(7);
  jwt.verify(token, "secret", (err, decoded) => {
    const id = decoded.id;
    db.query(
      "SELECT email FROM users WHERE id = '" + id + "'",
      (err, result) => {
        if (err) {
          return res.status(401).json({
            status: "103",
            message: "Bad Request!",
            data: "null",
          });
        }
        const email = result[0].email;
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 255;

        db.query(
          "SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transaction WHERE email = '" +
            email +
            "' LIMIT " +
            limit +
            " OFFSET " +
            offset,
          (err, result) => {
            if (err) {
              return res.status(401).json({
                status: "103",
                message: "Bad Request!",
                data: "null",
              });
            } else {
              return res.status(200).json({
                status: "0",
                message: "Sukses",
                data: result,
              });
            }
          }
        );
      }
    );
  });
});

app.get("/services", (req, res) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "108",
      message: "Token tidak valid atau kadarluarsa!",
      data: null,
    });
  }
  const token = authHead.substring(7);
  jwt.verify(token, "secret", (err, decoded) => {
    db.query("SELECT * FROM services", (err, result) => {
      if (err) {
        res
          .status(401)
          .json({ status: "103", message: "Bad Request!", data: "null" });
      } else {
        res.status(200).json({ status: "0", message: "Sukses", data: result });
      }
    });
  });
});

app.post("/transaction", (req, res) => {
  const authHead = req.headers.authorization;

  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "108",
      message: "Token tidak valid atau kadarluarsa!",
      data: null,
    });
  }

  const token = authHead.substring(7);
  jwt.verify(token, "secret", (err, decoded) => {
    const { service_code } = req.body;

    const validServiceCodes = [
      "PAJAK",
      "PLN",
      "PDAM",
      "PULSA",
      "MUSIK",
      "PGN",
      "TV",
      "PAKET_DATA",
      "VOUCHER_GAME",
      "VOUCHER_INTERNET",
      "VOUCHER_MAKANAN",
      "QURBAN",
      "ZAKAT",
    ];

    if (validServiceCodes.includes(service_code)) {
      db.query(
        "SELECT service_tarif, service_name, service_code FROM services WHERE service_code = '" +
          service_code +
          "'",
        (err, result) => {
          if (err) {
            return res.status(400).json({
              status: "102",
              message: "Service atau Layanan tidak tersedia!",
              data: null,
            });
          }

          const invoice_number = `INV` + Date.now() + ``;
          const service_name = result[0].service_name;
          const transaction_type = "PAYMENT";
          const created_on = Date.now();
          const tarif = result[0].service_tarif;
          const id = decoded.id;

          db.query(
            "SELECT email, balance FROM users WHERE id = '" + id + "'",
            (err, result) => {
              if (err) {
                return res.status(401).json({
                  status: "103",
                  message: "Bad Request!",
                  data: "null",
                });
              }

              const email = result[0].email;
              const balanceAwal = result[0].balance;
              const balance = parseInt(balanceAwal) - parseInt(tarif);
              if (balance <= 0) {
                return res.status(401).json({
                  status: "103",
                  message: "Saldo tidak cukup!",
                  data: "null",
                });
              }

              db.query(
                `UPDATE users SET balance = ` +
                  balance +
                  ` WHERE email = "` +
                  email +
                  `"`
              );

              db.query(
                `INSERT INTO transaction (email, invoice_number, description, transaction_type, total_amount, created_on) VALUES ('${email}','${invoice_number}','${service_name}','${transaction_type}','${parseInt(
                  tarif
                )}','${created_on}');`,
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return res.status(401).json({
                      status: "103",
                      message: "Token tidak tidak valid atau kadaluwarsa",
                      data: "null",
                    });
                  }

                  return res.status(200).json({
                    status: "0",
                    message: "Transaksi Berhasil!",
                    data: {
                      invoice_number: invoice_number,
                      service_code: service_code,
                      service_name: service_name,
                      transaction_type: "PAYMENT",
                      total_amount: tarif,
                      created_on: created_on,
                    },
                  });
                }
              );
            }
          );
        }
      );
    } else {
      res.status(400).json({
        status: "102",
        message: "Service atau Layanan tidak tersedia!",
        data: null,
      });
    }
  });
});

app.put("/profile/image", upload.single('profile_image'), (req, res) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "108",
      message: "Token tidak valid atau kadarluarsa!",
      data: null,
    });
  }
  const token = authHead.substring(7);
  jwt.verify(token, "secret", (err, decoded) => {
    const profile_image = req.file;
    const id = decoded.id;
    let dataExtract;
    db.query(
      "UPDATE users SET profile_image = ? WHERE id = ?",
      [profile_image.filename, id],
      (err, result) => {
        if (err) {
          res
            .status(401)
            .json({ status: "103", message: "Format Image tidak sesuai", data: "null" });
        } else {
          db.query(
            "SELECT email, first_name, last_name, profile_image FROM users WHERE id = '" +
              id +
              "'",
            (err, result) => {
              if (err) {
                res.status(401).json({
                  status: "103",
                  message: "Bad Request!",
                  data: "null",
                });
              } else {
                dataExtract = result;
                res
                  .status(200)
                  .json({ status: "0", message: "Update Profile Image Berhasil!", data: dataExtract });
              }
            }
          );
        }
      }
    );
  });
});
