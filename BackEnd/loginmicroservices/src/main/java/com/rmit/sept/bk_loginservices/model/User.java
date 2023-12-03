package com.rmit.sept.bk_loginservices.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.Collection;

/* This is a User Model class. 
    - All user's pending status is set to false unless specified 
    - There is a user role defined for every kind of user.
    - Validations have been put in place for all the required inputs
*/

@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email(message = "Username needs to be an email")
    @Size(min = 5, message = "Username should be atleast 5 characters long.")
    @NotBlank(message = "username is required")
    @Column(unique = true)
    private String username;

    @Size(min = 10, message = "Address must be atleast of length 10.")
    @NotBlank(message = "Please enter your Address")
    private String address;

    @Size(min = 9, max = 9, message = "Phone number must be of 9 digits long.")
    @NotBlank(message = "Please enter your phone number")
    private String phoneNumber;

    @Size(max = 25, message = "Full name cannot exceed 25 characters limit.")
    @NotBlank(message = "Please enter your full name")
    private String fullName;

    private String ABN;

    @Size(min = 6, message = "Password should be atleast 6 characters long.")
    @NotBlank(message = "Password field is required")
    private String password;

    @Transient
    private String confirmPassword;
    private boolean pending = false;

    @NotNull(message = "User Role must be defined.")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    private Date create_At;
    private Date update_At;

    // OneToMany with Project

    public User() {
    }

    public boolean isPending() {
        return pending;
    }

    public void setPending(boolean pending) {
        this.pending = pending;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getABN() {
        return ABN;
    }

    public void setABN(String abn) {
        this.ABN = abn;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
        if (this.userRole == UserRole.PUBLISHER) {
            this.setPending(true);
        }
    }

    public Date getCreate_At() {
        return create_At;
    }

    public void setCreate_At(Date create_At) {
        this.create_At = create_At;
    }

    public Date getUpdate_At() {
        return update_At;
    }

    public void setUpdate_At(Date update_At) {
        this.update_At = update_At;
    }

    @PrePersist
    protected void onCreate() {
        this.create_At = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.update_At = new Date();
    }

    /*
     * UserDetails interface methods
     */

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}