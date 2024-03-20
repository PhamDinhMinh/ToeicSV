const language = {
  language: 'Ngôn ngữ',
  english: 'Tiếng Anh',
  vietnamese: 'Tiếng Việt',
  korean: 'Tiếng Hàn',
};

const error = {
  'required-error-message': 'Không được bỏ trống',
  'password-pattern-error-message':
    'Tối thiểu 8 ký tự, bao gồm chữ cái và chữ số',
  'password-nomatching-error-message': 'Không khớp',
  passwordInvalid: 'Mật khẩu có tối thiểu 8 ký tự, chứa cả chữ cái và chữ số',
  userNameInvalid:
    'Tên người dùng chứa 6 đến 20 ký tự, không chứa dấu cách và kí tự đặc biệt',
  emailInvalid: 'Email không hợp lệ',
  phoneNumberInvalid: 'Số điện thoại không hợp lệ',
};

export const vi = {
  userOrEmail: 'Tên đăng nhập hoặc email',
  password: 'Mật khẩu',
  signIn: 'Đăng nhập',
  promptNoAccount: 'Bạn chưa có tài khoản',
  signUpNow: 'Đăng ký ngay',
  signUp: 'Đăng ký',
  fullName: 'Họ tên',
  userName: 'Tên đăng nhập',
  email: 'Địa chỉ email',
  phoneNumber: 'Số điện thoại',
  forgotPass: 'Quên mật khẩu',

  loading: 'Đang tải ...',
  ...language,
  ...error,
  key: 'Khoá',
};
