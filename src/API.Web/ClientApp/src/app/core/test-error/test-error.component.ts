import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  baseUrl = environment.baseApi.web;
  validationErrors: any;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
  }
  //#region access tests
  getOnlySuperAdminChecker() {
    this.http.get(this.baseUrl + 'buggy/OnlySuperAdminChecker').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  getAdmin_Create_Edit_DeleteAccess_Or_SuperAdmin() {
    this.http.get(this.baseUrl + 'buggy/Admin_Create_Edit_DeleteAccess_Or_SuperAdmin').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  getAdmin_Create_Edit_DeleteAccess() {
    this.http.get(this.baseUrl + 'buggy/Admin_Create_Edit_DeleteAccess').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  getAdmin_CreateAccess() {
    this.http.get(this.baseUrl + 'buggy/Admin_CreateAccess').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  getPolicyAccess() {
    this.http.get(this.baseUrl + 'buggy/PolicyAccess').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  getUser_Admin_Access() {
    this.http.get(this.baseUrl + 'buggy/User_Admin_Access').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  getAdminAccess() {
    this.http.get(this.baseUrl + 'buggy/AdminAccess').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  getUserAccess() {
    this.http.get(this.baseUrl + 'buggy/UserAccess').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  getAuthorizedAccess() {
    this.http.get(this.baseUrl + 'buggy/AuthorizedAccess').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  getAllAccess() {
    this.http.get(this.baseUrl + 'Buggy/AllAccess').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }
  //#endregion

  //#region tequest tests

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/notfound').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
    });
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'badrequest/fortytwo').subscribe(response => {
      this.toastrSuccess();
    }, error => {
      this.toastrError(error);
      this.validationErrors = error.errors;
    });
  }

  //#region 

  private toastrError(error: any) {
    this.toastr.error(error.message);
    // this.validationErrors = error.errors;
  }

  private toastrSuccess() {
    this.toastr.success("Success access");
  }

}
