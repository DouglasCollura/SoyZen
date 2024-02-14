import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, effect } from '@angular/core';
import { UserServiceService } from '../../shared/services/userService.service';
import { User } from '../../shared/interfaces/user-request.interface';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {

  private userService = inject(UserServiceService);

  public userId = signal(1);
  public currentUser = signal<User | undefined>(undefined);

  public fullName = computed<string>( () => {
    if(!this.currentUser()) return "Usuario no encontrado";
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  });

  public changeUserStatus = effect(() =>{
    console.log(`observable ${this.userId()}`)
  })

  ngOnInit(): void {
    this.loadUser(this.userId())
  }

  loadUser(id:number){
    if(id <= 0 ) return;
    this.userId.set(id);
    this.currentUser.set(undefined);

    this.userService.getUsersById(this.userId())
    .subscribe(user=>{
      this.currentUser.set(user);
    })
  }
}
