process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  afterAll(() => connection.destroy());

  describe("/questions", () => {
    it("200 GET List of questions", () => {
      return request(app)
        .get("/api/questions")
        .expect(200)
        .then((res) => {
          res.body.questions.forEach((question) => {
            expect(Object.keys(question)).toEqual(["id", "question"]);
          });
        });
    });
    it("200 GET responds with the correct length of questions array", () => {
      return request(app)
        .get("/api/questions")
        .expect(200)
        .then((res) => {
          expect(res.body.questions.length).toBe(4);
        });
    });
  });
  describe("/api/questions/:id", () => {
    it("200 GET a single question by an ID", () => {
      return request(app)
        .get("/api/questions/3")
        .expect(200)
        .then((res) => {
          const { question } = res.body;
          expect(question.id).toBe(3);
          expect(question.question).toBe(
            "How many letters in the word SunShine"
          );
        });
    });
  });
  describe("/api/questions/:id/answers", () => {
    it("200 GET return a single question with all possible answers", () => {
      return request(app)
        .get("/api/questions/2/answers")
        .expect(200)
        .then((res) => {
          const { question, a, b, c, d } = res.body;
          expect(question.question).toBe("What day of the week is it?");
          expect(question.a).toBe("Monday");
          expect(question.b).toBe("Tuesday");
          expect(question.c).toBe("Saturday");
          expect(question.d).toBe("Sunday");
        });
    });
  });
  describe("/api/questions/:id/correct", () => {
    it("200 GET a single question with the correct answer", () => {
      return request(app)
        .get("/api/questions/3/correct")
        .expect(200)
        .then((res) => {
          expect(res.body.question[0].question).toBe(
            "How many letters in the word SunShine"
          );
          expect(res.body.question[0].correctAnswer).toBe("8");
        });
    });
  });

  describe("/api/answers", () => {
    it("200 GET List of all possible answers", () => {
      return request(app)
        .get("/api/answers")
        .expect(200)
        .then((res) => {
          res.body.answers.forEach((answer) => {
            expect(Object.keys(answer)).toEqual(["a", "b", "c", "d", "id"]);
          });
        });
    });
    it("200 GET responds with the correct ammount of answer for all questions", () => {
      return request(app)
        .get("/api/answers")
        .expect(200)
        .then((res) => {
          expect(res.body.answers.length).toBe(4);
        });
    });
  });
  describe("/api/answers/:id", () => {
    it("200 GET returns all the possible answers for a single question", () => {
      return request(app)
        .get("/api/answers/3")
        .expect(200)
        .then((res) => {
          expect(res.body.a).toBe("4");
          expect(res.body.b).toBe("8");
          expect(res.body.c).toBe("9");
          expect(res.body.d).toBe("6");
          expect(res.body.id).toBe(3);
        });
    });
  });
  describe("/api/register", () => {
    it("200 GET returns all the users", () => {
      return request(app)
        .get("/api/register")
        .expect(200)
        .then((res) => {
          res.body.users.forEach((user) => {
            expect(Object.keys(user)).toEqual([
              "user_email",
              "user_firstName",
              "user_lastName",
              "user_password",
            ]);
          });
        });
    });
    it("201 POST user", () => {
      return request(app)
        .post("/api/register")
        .send({
          user_email: "d@outlook.com",
          user_firstName: "d",
          user_lastName: "4",
          user_password: "dddddd",
        })
        .expect(201)
        .then((res) => {
          const { user } = res.body;
          expect(user.user_email).toBe("d@outlook.com");
          expect(user.user_firstName).toBe("d");
          expect(user.user_lastName).toBe("4");
          expect(user.user_password).toBe("dddddd");
        });
    });
    // it("400 Bad Request, Post Error, missing a field", () => {
    //   return request(app)
    //     .post("/api/register")
    //     .expect(400)
    //     .then((res) => {
    //       expect(res.body.msg).toBe("400 - Bad Request");
    //       expect(res.status).toBe(400);
    //     });
    // });
    it("204 DELETE user by email", () => {
      return request(app)
        .delete("/api/register/a@outlook.com")
        .expect(204)
        .then(() => {
          return request(app)
            .get("/api/register")
            .expect(200)
            .then((res) => {
              res.body.users.forEach((user) => {
                expect(user.user_email).not.toBe("z@outlook.com");
              });
            });
        });
    });
    it("404 Not Found, user email does not exist (delete)", () => {
      return request(app)
        .del("/api/register/1234xyz@outlook.com")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("404 Error: Not Found");
          expect(res.status).toBe(404);
        });
    });
    it("PATCH 200 updates the user first name", () => {
      return request(app)
        .patch("/api/register/a@outlook.com")
        .send({ user_firstName: "z" })
        .expect(200)
        .then((res) => {
          const { updatedUser } = res.body;
          expect(updatedUser.user_firstName).toBe("z");
        });
    });
    it("404 Not Found, user does not exist (patch)", () => {
      return request(app)
        .patch("/api/register/1234xyz@outlook.com")
        .send({ user_firstName: "z" })
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("404 Error: Not Found");
          expect(res.status).toBe(404);
        });
    });
  });
  describe("/api/register/:email", () => {
    it("200 GET get user by email", () => {
      return request(app)
        .get("/api/register/a@outlook.com")
        .expect(200)
        .then((res) => {
          const { singleUser } = res.body;
          expect(singleUser.user_email).toBe("a@outlook.com");
          expect(singleUser.user_firstName).toBe("a");
          expect(singleUser.user_lastName).toBe("1");
          expect(singleUser.user_password).toBe("aaaaaa");
        });
    });
    it("404 Not Found, user email does not exist (get)", () => {
      return request(app)
        .get("/api/register/1234xyz@outlook.com")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("404 Error: Not Found");
          expect(res.status).toBe(404);
        });
    });
  });
});
