
export function isUsername(str: string) {
  const user = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,10}$/
  return user.test(str)
}

export function isPassword(str: string) {
  // const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,10}$/;
  const pass = /^[A-Za-z\d!@#$%^&*]{5,10}$/
  return pass.test(str)
}

export function isEmail(str: string) {
  const code = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  return code.test(str)
}
  