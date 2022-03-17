package com.doubletex.app.api.user.invite;

import com.doubletex.app.api.BaseEntity;
import com.doubletex.app.api.company.Company;
import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.user.User;
import com.doubletex.app.util.IdProxySerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInvite extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonSerialize(using = IdProxySerializer.class)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonSerialize(using = IdProxySerializer.class)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonSerialize(using = IdProxySerializer.class)
    private Employee inviter;

    public Info makeInfo() {
        return new Info(
            this.getId(),
            this.employee.getId(),
            this.inviter.getFirstName() + " " + this.inviter.getLastName(),
            this.employee.getCompany().getName(),
            this.employee.getFirstName() + " " + this.employee.getLastName()
        );
    }

    @Data
    @AllArgsConstructor
    public static class Info {
        private long id;
        private long employeeId;
        private String inviterName;
        private String companyName;
        private String employeeName;
    }
}
