import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["modal", "modal2", "email", "emailWarning", "phoneField", "phone", "notice"]

  connect() {
    if (this.noticeTargets.length != 0 && this.noticeTarget.innerText == "User successfully created") {
      this.modalTarget.close();
      this.modal2Target.showModal();
    }
  }

  open(event) {
    event.preventDefault();
    this.modalTarget.showModal();
  }

  open_employment(event) {
    event.preventDefault();
    this.modal2Target.showModal();
  }

  close(event) {
    event.preventDefault();
    this.modalTarget.close();
  }

  close_employment(event) {
    event.preventDefault();
    this.modal2Target.close();
  }

  email_verification(event) {
    event.preventDefault();

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailTarget.value)) {
      this.emailTarget.classList.add('border-gray-300');
      this.emailTarget.classList.remove('border-red-800');
      this.emailWarningTarget.classList.add('invisible');
      this.phoneFieldTarget.classList.remove('invisible');
    }else if (this.emailTarget.classList.contains('border-gray-300')){
      this.emailTarget.classList.remove('border-gray-300');
      this.emailTarget.classList.add('border-red-800');
      this.emailWarningTarget.classList.remove('invisible');
      this.phoneFieldTarget.classList.add('invisible');
    }
  }

  phone_verification(event) {
    var phone = this.phoneTarget.value;
    var len = phone.length;
    if(event.data) {
      if (!/^\d+$/.test(event.data)) {
        this.phoneTarget.value = phone.slice(0,-1);
      }
      else if ( len == 4 || len == 8 ) {
        this.phoneTarget.value = phone.slice(0,len-1,) + '-' + phone[len-1];
      }
    }else {
      if(phone[len-1] == '-'){
        this.phoneTarget.value = phone.slice(0,-1);
      }
    }
  }
}
