export enum ETypePart1 {
  Portrait_Description = 1,
  Object_Description = 2,
  Other_Description = 3,
}

export const TypePart1 = [
  {label: 'Tranh tả người', value: ETypePart1.Portrait_Description},
  {label: 'Tranh tả vật', value: ETypePart1.Object_Description},
  {label: 'Tranh tả cả người và vật', value: ETypePart1.Other_Description},
];

export enum ETypePart2 {
  What_Question = 1,
  Who_Question = 2,
  Where_Question = 3,
  When_Question = 4,
  How_Question = 5,
  Why_Question = 6,
  Yes_No_Question = 7,
  Tail_Question = 8,
  Multiple_Choice_Question = 9,
  Request = 10,
  Statement = 11,
}

export const TypePart2 = [
  {label: 'Câu hỏi WHAT', value: ETypePart2.What_Question},
  {label: 'Câu hỏi WHO', value: ETypePart2.Who_Question},
  {label: 'Câu hỏi WHERE', value: ETypePart2.Where_Question},
  {label: 'Câu hỏi WHEN', value: ETypePart2.When_Question},
  {label: 'Câu hỏi HOW', value: ETypePart2.How_Question},
  {label: 'Câu hỏi WHY', value: ETypePart2.Why_Question},
  {label: 'Câu hỏi YES/NO', value: ETypePart2.Yes_No_Question},
  {label: 'Câu hỏi đuôi', value: ETypePart2.Tail_Question},
  {label: 'Câu hỏi lựa chọn', value: ETypePart2.Multiple_Choice_Question},
  {label: 'Câu yêu cầu, đề nghị', value: ETypePart2.Request},
  {label: 'Câu trần thuật', value: ETypePart2.Statement},
];

export enum ETypePart3 {
  Theme_Purpose_Question = 1,
  Speaker_Identity_Question = 2,
  Conversation_Detail_Question = 3,
  Future_Action_Question = 4,
  Table_Combined_Question = 5,
  Implication_Question = 6,
  Company_General_Office_Work = 7,
  Company_Personnel = 8,
  Company_Business_Marketing = 9,
  Company_Event_Project = 10,
  Company_Facility = 11,
  Shopping_Service = 12,
  Order_Delivery = 13,
  Transportation = 14,
  Request_Suggestion = 15,
  Location_Question = 16,
}

export const TypePart3 = [
  {
    label: 'Câu hỏi về chủ đề, mục đích',
    value: ETypePart3.Theme_Purpose_Question,
  },
  {
    label: 'Câu hỏi về danh tính người nói',
    value: ETypePart3.Speaker_Identity_Question,
  },
  {
    label: 'Câu hỏi về chi tiết cuộc hội thoại',
    value: ETypePart3.Conversation_Detail_Question,
  },
  {
    label: 'Câu hỏi về hành động tương lai',
    value: ETypePart3.Future_Action_Question,
  },
  {
    label: 'Câu hỏi kết hợp bảng biểu',
    value: ETypePart3.Table_Combined_Question,
  },
  {label: 'Câu hỏi về hàm ý câu nói', value: ETypePart3.Implication_Question},
  {
    label: 'Chủ đề: Company - General Office Work',
    value: ETypePart3.Company_General_Office_Work,
  },
  {label: 'Chủ đề: Company - Personnel', value: ETypePart3.Company_Personnel},
  {
    label: 'Chủ đề: Company - Business, Marketing',
    value: ETypePart3.Company_Business_Marketing,
  },
  {
    label: 'Chủ đề: Company - Event, Project',
    value: ETypePart3.Company_Event_Project,
  },
  {label: 'Chủ đề: Company - Facility', value: ETypePart3.Company_Facility},
  {label: 'Chủ đề: Shopping, Service', value: ETypePart3.Shopping_Service},
  {label: 'Chủ đề: Order, delivery', value: ETypePart3.Order_Delivery},
  {label: 'Chủ đề: Transportation', value: ETypePart3.Transportation},
  {label: 'Câu hỏi về yêu cầu, gợi ý', value: ETypePart3.Request_Suggestion},
  {
    label: 'Câu hỏi về địa điểm hội thoại',
    value: ETypePart3.Location_Question,
  },
];

export enum ETypePart4 {
  Theme_Purpose_Question = 1,
  Identity_Location_Question = 2,
  Detail_Question = 3,
  Future_Action_Question = 4,
  Table_Combined_Question = 5,
  Implication_Question = 6,
  Telephone_Message = 7,
  Advertisement = 8,
  Announcement = 9,
  Talk = 10,
  Excerpt_Meeting = 11,
  Request_Suggestion = 12,
}

export const TypePart4 = [
  {
    label: 'Câu hỏi về chủ đề, mục đích',
    value: ETypePart4.Theme_Purpose_Question,
  },
  {
    label: 'Câu hỏi về danh tính, địa điểm',
    value: ETypePart4.Identity_Location_Question,
  },
  {label: 'Câu hỏi về chi tiết', value: ETypePart4.Detail_Question},
  {
    label: 'Câu hỏi về hành động tương lai',
    value: ETypePart4.Future_Action_Question,
  },
  {
    label: 'Câu hỏi kết hợp bảng biểu',
    value: ETypePart4.Table_Combined_Question,
  },
  {label: 'Câu hỏi về hàm ý câu nói', value: ETypePart4.Implication_Question},
  {
    label: 'Dạng bài: Telephone message - Tin nhắn thoại',
    value: ETypePart4.Telephone_Message,
  },
  {
    label: 'Dạng bài: Advertisement - Quảng cáo',
    value: ETypePart4.Advertisement,
  },
  {
    label: 'Dạng bài: Announcement - Thông báo',
    value: ETypePart4.Announcement,
  },
  {label: 'Dạng bài: Talk - Bài phát biểu, diễn văn', value: ETypePart4.Talk},
  {
    label: 'Dạng bài: Excerpt from a meeting - Trích dẫn từ buổi họp',
    value: ETypePart4.Excerpt_Meeting,
  },
  {label: 'Câu hỏi yêu cầu, gợi ý', value: ETypePart4.Request_Suggestion},
];

export enum ETypePart5 {
  Type_Question = 1,
  Grammar_Question = 2,
  Vocabulary_Question = 3,
  Noun = 4,
  Pronoun = 5,
  Adjective = 6,
  Tense = 7,
  Form = 8,
  Adverb = 9,
  Infinitive_Verb_To = 10,
  Gerund_Noun_Verb = 11,
  Verb_Infinitive = 12,
  Participle_Structure = 13,
  Preposition = 14,
  Conjunction = 15,
  Relative_Clause = 16,
}

export const TypePart5 = [
  {label: 'Câu hỏi từ loại', value: ETypePart5.Type_Question},
  {label: 'Câu hỏi ngữ pháp', value: ETypePart5.Grammar_Question},
  {label: 'Câu hỏi từ vựng', value: ETypePart5.Vocabulary_Question},
  {label: 'Danh từ', value: ETypePart5.Noun},
  {label: 'Đại từ', value: ETypePart5.Pronoun},
  {label: 'Tính từ', value: ETypePart5.Adjective},
  {label: 'Thì', value: ETypePart5.Tense},
  {label: 'Thể', value: ETypePart5.Form},
  {label: 'Trạng từ', value: ETypePart5.Adverb},
  {label: 'Động từ nguyên mẫu có "to"', value: ETypePart5.Infinitive_Verb_To},
  {label: 'Danh động từ', value: ETypePart5.Gerund_Noun_Verb},
  {label: 'Động từ nguyên mẫu', value: ETypePart5.Verb_Infinitive},
  {
    label: 'Phân từ và Cấu trúc phân từ',
    value: ETypePart5.Participle_Structure,
  },
  {label: 'Giới từ', value: ETypePart5.Preposition},
  {label: 'Liên từ', value: ETypePart5.Conjunction},
  {label: 'Mệnh đề quan hệ', value: ETypePart5.Relative_Clause},
];

export enum ETypePart6 {
  Type_Question = 1,
  Grammar_Question = 2,
  Vocabulary_Question = 3,
  Fill_In_The_Blank = 4,
  Email_Letter = 5,
  Article_Review = 6,
  Notice_Announcement = 7,
  Noun = 8,
  Pronoun = 9,
  Adjective = 10,
  Form = 11,
  Adverb = 12,
  Participle_Structure = 13,
  Conjunction = 14,
  Relative_Clause = 15,
}

export const TypePart6 = [
  {label: 'Câu hỏi từ loại', value: ETypePart6.Type_Question},
  {label: 'Câu hỏi ngữ pháp', value: ETypePart6.Grammar_Question},
  {label: 'Câu hỏi từ vựng', value: ETypePart6.Vocabulary_Question},
  {
    label: 'Câu hỏi điền câu vào đoạn văn',
    value: ETypePart6.Fill_In_The_Blank,
  },
  {
    label: 'Hình thức: Thư điện tử/ thư tay (Email/ Letter)',
    value: ETypePart6.Email_Letter,
  },
  {
    label: 'Hình thức: Bài báo (Article/ Review)',
    value: ETypePart6.Article_Review,
  },
  {
    label:
      'Hình thức: Thông báo/ văn bản hướng dẫn (Notice/ Announcement Information)',
    value: ETypePart6.Notice_Announcement,
  },
  {label: 'Danh từ', value: ETypePart6.Noun},
  {label: 'Đại từ', value: ETypePart6.Pronoun},
  {label: 'Tính từ', value: ETypePart6.Adjective},
  {label: 'Thể', value: ETypePart6.Form},
  {label: 'Trạng từ', value: ETypePart6.Adverb},
  {
    label: 'Phân từ và Cấu trúc phân từ',
    value: ETypePart6.Participle_Structure,
  },
  {label: 'Liên từ', value: ETypePart6.Conjunction},
  {label: 'Mệnh đề quan hệ', value: ETypePart6.Relative_Clause},
];

export enum ETypePart7 {
  Information_Search_Question = 1,
  Theme_Purpose_Question = 2,
  Inference_Question = 3,
  Fill_In_The_Blank_Question = 4,
  Single_Paragraph_Structure = 5,
  Multi_Paragraph_Structure = 6,
  Email_Letter_Form = 7,
  Form_Form = 8,
  Article_Review_Form = 9,
  Advertisement_Form = 10,
  Text_Message_Chain_Form = 11,
  Synonym_Search_Question = 12,
  Implication_Question = 13,
  Schedule_Time = 14,
  Detail_mistake = 15,
  Announcement_notice = 16,
}

export const TypePart7 = [
  {
    label: 'Câu hỏi tìm thông tin',
    value: ETypePart7.Information_Search_Question,
  },
  {
    label: 'Câu hỏi về chủ đề, mục đích',
    value: ETypePart7.Theme_Purpose_Question,
  },
  {
    label: 'Câu hỏi suy luận',
    value: ETypePart7.Inference_Question,
  },
  {
    label: 'Câu hỏi điền câu',
    value: ETypePart7.Fill_In_The_Blank_Question,
  },
  {
    label: 'Cấu trúc: một đoạn',
    value: ETypePart7.Single_Paragraph_Structure,
  },
  {
    label: 'Cấu trúc: nhiều đoạn',
    value: ETypePart7.Multi_Paragraph_Structure,
  },
  {
    label: 'Dạng bài: Email/ Letter: Thư điện tử/ Thư tay',
    value: ETypePart7.Email_Letter_Form,
  },
  {
    label: 'Dạng bài: Form - Đơn từ, biểu mẫu',
    value: ETypePart7.Form_Form,
  },
  {
    label: 'Dạng bài: Article/ Review: Bài báo/ Bài đánh giá',
    value: ETypePart7.Article_Review_Form,
  },
  {
    label: 'Dạng bài: Advertisement - Quảng cáo',
    value: ETypePart7.Advertisement_Form,
  },
  {
    label: 'Dạng bài: Text message chain - Chuỗi tin nhắn',
    value: ETypePart7.Text_Message_Chain_Form,
  },
  {
    label: 'Câu hỏi tìm từ đồng nghĩa',
    value: ETypePart7.Synonym_Search_Question,
  },
  {
    label: 'Câu hỏi về hàm ý câu nói',
    value: ETypePart7.Implication_Question,
  },
  {
    label: 'Dạng bài: Schedule - Lịch trình, thời gian biểu',
    value: ETypePart7.Schedule_Time,
  },
  {
    label: 'Câu hỏi chi tiết sai',
    value: ETypePart7.Detail_mistake,
  },
  {
    label: 'Announcement/ Notice: Thông báo',
    value: ETypePart7.Announcement_notice,
  },
];
