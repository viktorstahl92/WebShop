import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName: null,
    email: null,
    address: null,
    city: null,
    postalCode: null,
    role: null
  };
  isSignUpFailed = false;

  id?: number;

  errorMessage = '';
  constructor(private userService: UserService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      console.log(+params['id'])
      this.getUser(+params['id']);
      this.id = (+params['id']);
    })
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe((user) => {
      if (user) {
        console.log(user)
        this.form.city = user.city;
        this.form.firstName = user.firstName;
        this.form.lastName = user.lastName;
        this.form.address = user.address;
        this.form.email = user.email;
        this.form.postalCode = user.postalCode
        this.form.role = user.role;
      };
    });
  }

  onSubmit(): void {
    if (!this.id) return
    const { firstName, lastName, email, password, address, city, postalCode, role } = this.form;
    this.userService.updateUser(this.id, address, city, postalCode, email, firstName, lastName, role).subscribe((user =>{
      if (user){
        console.log(user);
      }
    }))

  }
}
