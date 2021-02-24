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
          expect(question).toBe("What day of the week is it?");
          expect(a).toBe("Monday");
          expect(b).toBe("Tuesday");
          expect(c).toBe("Saturday");
          expect(d).toBe("Sunday");
        });
    });
  });
  describe("/api/questions/:id/correct", () => {
    it("200 GET a single question with the correct answer", () => {
      return request(app)
        .get("/api/questions/3/correct")
        .expect(200)
        .then((res) => {
          const { question } = res.body;
          const { correctAnswer } = res.body;
          expect(question).toBe("How many letters in the word SunShine");
          expect(correctAnswer).toBe("8");
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
});
