# 🧮 Maths Generator – Google Form Auto-Builder

This Google Apps Script project automatically generates math quizzes in the form of:

- 📋 Google Forms (MCQ-style, auto-marked)
- 📄 Google Sheets (with question/answer tracking)
- 📑 Printable PDFs (Student & Teacher copies)

Designed for **teachers and educators** who want to save time preparing math drills for students aged 9–13.

---

## 🚀 Features

✅ Auto-generates **4 Aktiviti (quizzes)** per run  
✅ Each Aktiviti has **60 randomized questions**  
✅ Supports: Addition, Subtraction, Multiplication, Division  
✅ MCQ format with **4 choices per question**  
✅ Sets the **correct answer + wrong options** automatically  
✅ Creates both:
- 🧑‍🎓 Student version (blank)
- 🧑‍🏫 Teacher version (with answers)

✅ **Auto-grading enabled**  
✅ Shows results **immediately after submission**  
✅ Collects **Name, Class & Email**  
✅ **Response sheet** linked for teacher review  
✅ Friendly feedback if the answer is wrong  
✅ Smart scoring tiers:
- 💚 Above 50% – “Well done!”
- 🧡 30–49% – “Good try, keep practicing!”
- ❤️ Below 30% – “Don’t worry! You can improve!”

---

## 🧠 Why It Exists

This tool was created to support teachers — especially those working with underperforming students or in rural schools — who need to simplify their quiz workflow and make math practice more engaging without the manual headache.

---

## 📷 Screenshots

| Google Form (MCQ) | Teacher PDF | Google Sheet |
|-------------------|-------------|---------------|
![image](https://github.com/user-attachments/assets/58731f11-bb00-425c-b640-3114dececfb3)
![image](https://github.com/user-attachments/assets/6b68120c-09d9-4f33-a8f1-c3fdeba12db3)
![image](https://github.com/user-attachments/assets/04dc5dd4-1586-409b-9428-eb5c9c39be2f)



---

## ⚙️ How It Works

This script uses the [Google Apps Script](https://developers.google.com/apps-script) environment to:

1. Randomly generate math questions
2. Create a new **sheet** with questions and answers
3. Generate a **Google Form** linked to that sheet
4. Export printable **PDFs** for both student and teacher
5. Auto-mark responses and sync to Sheets

---

## 📁 Setup Instructions

1. Go to [script.new](https://script.new)
2. Paste in the [`Code.gs`](./Code.gs) contents
3. Save and name your project (e.g. "Maths Generator")
4. Run the function `batchGenerateMathsQuizzes`
5. Accept the permission prompts

Done! You’ll now find:
- Forms in your **Google Forms**
- Sheets in your **Drive**
- PDFs in **separate folders per Aktiviti**

---

## 📌 Limitations

- ❌ Does not handle fractions, decimals, or word problems
- ⚠️ Limited to 4 Aktiviti per run due to **execution time limits**
- ❌ Not designed for advanced math or older students (yet)

---

## 🙋 Who It's For

- 👩‍🏫 Primary and middle school math teachers
- 💻 Education tech volunteers and NGOs
- 🧑‍💼 Developers building tools for education

---

## 🤝 Contributing

Want to expand this?
- Add fractions or harder difficulty
- Translate into other languages (BM, CN, etc.)
- Export score reports or summary analytics

PRs welcome!

---

## 📄 License

This project is licensed under the **MIT License** – free to use, modify, and share.
