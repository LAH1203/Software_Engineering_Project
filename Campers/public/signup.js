function checkfield(){

    if(document.sign_form.name.value==""){
      alert("이름을 입력하세요");
      document.addjoin.name.focus();
      exit;
      
    }else if(document.sign_form.email.value==""){
      alert("이메일을 입력하세요");
      document.addjoin.email.focus();
      exit;
      
    }else if(document.sign_form.password.value==""){
      alert("비밀번호를 입력하세요");
      document.addjoin.pw.focus();
      exit;
    
    }else if(document.sign_form.password2.value==""){
      alert("비밀번호확인을 입력하세요");
      document.addjoin.pw2.focus();
      exit;
    
    }else if(document.sign_form.phone.value == ""){
      alert("전화번호를 입력하세요");
      document.sign_form.focus();
      exit;
    }
    
    if(document.sign_form.password.value!=document.sign_form.password2.value){
    //비밀번호와 비밀번호확인의 값이 다를 경우
    
    alert("입력한 2개의 비밀번호가 일치하지 않습니다.");
    document.sign_form.password.focus();
    exit;
    
    }
    
    var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    
    if(exptext.test(document.sign_form.email.value)==false){
    //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우
    
    alert("이 메일형식이 올바르지 않습니다.");
    document.sign_form.email.focus();
    exit;
    }
  
    document.sign_form.email.submit();
    
   }
  
  