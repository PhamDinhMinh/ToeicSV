const language = {
  language: '언어',
  english: '영어',
  vietnamese: '베트남어',
  korean: '한국어',
};

const error = {
  'required-error-message': '필수 입력 항목입니다',
  'password-pattern-error-message': '최소 8자, 문자와 숫자를 포함해야 합니다',
  'password-not-matching-error-message': '일치하지 않습니다',
  passwordInvalid: '비밀번호는 최소 8자이며 문자와 숫자를 포함해야 합니다',
  userNameInvalid:
    '사용자 이름은 공백 및 특수 문자 없이 6자에서 20자여야 합니다',
  emailInvalid: '유효하지 않은 이메일입니다',
  phoneNumberInvalid: '유효하지 않은 전화번호입니다',
};

export const ko = {
  userOrEmail: '사용자 이름 또는 이메일',
  password: '비밀번호',
  signIn: '로그인',
  promptNoAccount: '계정이 없습니다',
  signUpNow: '지금 등록하기',
  signUp: '등록하다',
  fullName: '성명',
  userName: '사용자 이름',
  email: '이메일 주소',
  phoneNumber: '전화번호',

  loading: '로딩 ...',

  ...language,
  ...error,
};
