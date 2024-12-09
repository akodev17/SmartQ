Table User {
  id          int [pk, increment]    // Foydalanuvchi ID
  email       varchar [unique, not null] // Foydalanuvchi emaili
  password    varchar [not null]     // Foydalanuvchi paroli
  created_at  timestamp [default: `now()`] // Yaratilgan sana
  updated_at  timestamp [default: `now()`] // Yangilangan sana
  role enum('admin', 'user') [default: 'user']
}

Table Category {
  id          int [pk, increment]    // Kategoriya ID
  name        varchar [not null]     // Kategoriya nomi
  created_at  timestamp [default: `now()`] // Yaratilgan sana
  updated_at  timestamp [default: `now()`] // Yangilangan sana
}

Table Question {
  id               int [pk, increment]    // Savol ID
  category_id      int [not null, ref: > Category.id] // Kategoriya bilan bog'liq
  question         varchar [not null]     // Savol matni
  correct_answer   varchar [not null]     // To'g'ri javob
  created_at       timestamp [default: `now()`] // Yaratilgan sana
  updated_at       timestamp [default: `now()`] // Yangilangan sana
}

Table Option {
  id           int [pk, increment]    // Variant ID
  question_id  int [not null, ref: > Question.id] // Savol bilan bog'liq
  option_text  varchar [not null]     // Variant matni
  created_at   timestamp [default: `now()`] // Yaratilgan sana
  updated_at   timestamp [default: `now()`] // Yangilangan sana
}

Table Quiz {
  id           int [pk, increment]    // Test ID
  title        varchar [not null]     // Test nomi
  description  text                   // Test tavsifi
  category_id  int [ref: > Category.id] // Kategoriya bilan bog'liq
  created_by   int [ref: > User.id]    // Kim yaratganligi
  created_at   timestamp [default: `now()`] // Yaratilgan sana
  updated_at   timestamp [default: `now()`] // Yangilangan sana
}

Table User_Quiz {
  id           int [pk, increment]    // User-Quiz bog'lanish ID
  user_id      int [not null, ref: > User.id] // Foydalanuvchi
  quiz_id      int [not null, ref: > Quiz.id] // Test
  score        int                    // Testdan olingan ball
  completed_at timestamp [default: `now()`] // Testni tugatgan vaqt
}

Table User_Answer {
  id           int [pk, increment]    // User-Answer bog'lanish ID
  user_id      int [not null, ref: > User.id] // Foydalanuvchi
  question_id  int [not null, ref: > Question.id] // Savol
  option_id    int [not null, ref: > Option.id] // Variant
  is_correct   boolean                // Javob to'g'ri yoki yo'q
}
