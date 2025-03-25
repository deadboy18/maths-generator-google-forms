function batchGenerateMathsQuizzes() {
  const spreadsheet = SpreadsheetApp.create("Maths Fun - Master Sheet");

  // ⚠️ LIMIT: Only 4 Aktiviti to avoid timeout
  for (let i = 1; i <= 4; i++) {
    generateMathsFormAndDocs(i, spreadsheet);
  }
}

function generateMathsFormAndDocs(sheetIndex, spreadsheet) {
  const sheetName = "Aktiviti " + sheetIndex;
  const sheet = spreadsheet.insertSheet(sheetName);
  const folder = DriveApp.createFolder("Aktiviti_" + sheetIndex + "_PDFs");

  sheet.appendRow(["First", "Operator", "Second", "Answer"]);
  const ops = ['+', '-', '×', '÷'];
  const data = [];

  for (let i = 0; i < 60; i++) {
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, ans;

    if (op === '+') {
      a = randInt(100, 999);
      b = randInt(100, 999);
      ans = a + b;
    } else if (op === '-') {
      a = randInt(100, 999);
      b = randInt(1, a);
      ans = a - b;
    } else if (op === '×') {
      a = randInt(2, 12);
      b = randInt(2, 12);
      ans = a * b;
    } else if (op === '÷') {
      b = randInt(2, 12);
      ans = randInt(2, 12);
      a = b * ans;
    }

    data.push([a, op, b, ans]);
  }

  sheet.getRange(2, 1, 60, 4).setValues(data);

  // --- Google Form ---
  const form = FormApp.create(`Maths Fun - ${sheetName}`);
  form.setIsQuiz(true);
  form.setTitle(`Maths Fun - ${sheetName}`);
  form.setDescription("Answer all questions. Scores will be shown immediately after submission.");
  form.setCollectEmail(true);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage("Thanks! Your score has been submitted.");

  // Add Name & Class
  form.addTextItem().setTitle("Name").setRequired(true);
  form.addTextItem().setTitle("Class").setRequired(true);

  // Add 60 questions
  for (let i = 0; i < data.length; i++) {
    const [a, op, b, ans] = data[i];
    const qText = `Q${i + 1}: ${a} ${op} ${b} =`;
    const correct = ans.toString();
    const choices = generateChoices(correct);

    const item = form.addMultipleChoiceItem();
    item.setTitle(qText)
        .setRequired(true)
        .setPoints(1)
        .setChoices(choices.map(opt => item.createChoice(opt, opt === correct)));

    // Friendly Feedback Based on Performance
    const feedbackText = getFeedbackText();
    const feedback = FormApp.createFeedback()
      .setText(feedbackText + ` (Answer: ${correct})`)
      .build();
    item.setFeedbackForIncorrect(feedback);
  }

  // Link form responses to same Sheet
  try {
    form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  } catch (e) {
    Logger.log("⚠️ Destination already set: " + e.message);
  }

  // --- PDFs ---
  const teacherDoc = DocumentApp.create(`${sheetName} - Teacher Copy`);
  const studentDoc = DocumentApp.create(`${sheetName} - Student Copy`);

  const tBody = teacherDoc.getBody();
  const sBody = studentDoc.getBody();

  tBody.appendParagraph(`📘 Maths Fun - ${sheetName} (Teacher Copy)`).setHeading(DocumentApp.ParagraphHeading.TITLE);
  sBody.appendParagraph(`✏️ Maths Fun - ${sheetName} (Student Copy)`).setHeading(DocumentApp.ParagraphHeading.TITLE);
  tBody.appendParagraph("────────────────────────────");
  sBody.appendParagraph("────────────────────────────");

  for (let i = 0; i < data.length; i++) {
    const [a, op, b, ans] = data[i];
    const q = `Q${i + 1}: ${a} ${op} ${b} = _______`;
    tBody.appendParagraph(`${q}     ✅ Ans: ${ans}`);
    sBody.appendParagraph(q);
  }

  teacherDoc.saveAndClose();
  studentDoc.saveAndClose();

  Utilities.sleep(500);
  folder.createFile(DriveApp.getFileById(teacherDoc.getId()).getAs('application/pdf')).setName(`${sheetName} - Teacher.pdf`);
  folder.createFile(DriveApp.getFileById(studentDoc.getId()).getAs('application/pdf')).setName(`${sheetName} - Student.pdf`);

  Logger.log("✅ Form: " + form.getEditUrl());
  Logger.log("📄 PDFs saved in: " + folder.getName());
}

// 📊 Soft Grading Feedback
function getFeedbackText() {
  const roll = Math.random();
  if (roll > 0.5) return "Well done!";
  else if (roll > 0.2) return "Good try, keep practicing!";
  else return "Don’t worry! You can improve!";
}

// Helpers
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateChoices(correct) {
  correct = parseInt(correct);
  const choices = new Set();
  choices.add(correct);

  while (choices.size < 4) {
    const offset = Math.floor(Math.random() * 20) + 1;
    const fake = correct + (Math.random() < 0.5 ? -offset : offset);
    if (fake >= 0 && !choices.has(fake)) choices.add(fake);
  }

  return Array.from(choices).sort(() => Math.random() - 0.5).map(String);
}
