function signupform_check() {

  var reg = /^[0-9]+/g; //숫자만 입력하는 정규식

  if (document.sign_form.name.value == "") {
    alert("이름을 입력하세요.");
    document.sign_form.name.value.focus();
    return false;
  } else if (document.sign_form.email.value == "") {
    alert("이메일 주소를 입력하세요.");
    document.sign_form.email.value.focus();
    return false;
  } else if (document.sign_form.password.value == "") {
    alert("비밀번호를 입력하세요.");
    document.sign_form.password.value.focus();
    return false;
  } else if (document.sign_form.password.value !== document.sign_form.password2.value) {
    alert("비밀번호가 일치하지 않습니다.");
    document.sign_form.password2.value.focus();
    return false;
  }else if (!reg.test(document.sign_form.phone.value)) {
    alert("전화번호는 숫자만 입력할 수 있습니다.");
    document.sign_form.phone.value.focus();
    return false;
  }
    
  document.sign_form.submit();
}