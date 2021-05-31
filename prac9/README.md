## [OWASP Juice Shop](https://github.com/bkimminich/juice-shop)

## run

```
docker run -d -p 3000:3000 bkimminich/juice-shop
```

## access dashboard 

http://localhost:3000/#/score-board

## doc


https://aihalapathirana.medium.com/owasp-juice-shop-access-scoreboard-and-admin-section-40590a8ae455

https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/appendix/solutions.html


## Question Solutions

### 1. Log in with Bender's user account ⭐️⭐️⭐️ Injection
* Log in with *Email* `bender@juice-sh.op'--` and any *Password* if you already know the email address of Bender.
* A rainbow table attack on Bender's password will probably fail as it is rather strong. You can alternatively solve [Change Bender's password into *slurmCl4ssic* without using SQL Injection or Forgot Password](https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/appendix/solutions.html#change-benders-password-into-slurmcl4ssic-without-using-sql-injection-or-forgot-password) first and then simply log in with the new password.

### 2. Perform a DOM XSS attack ⭐️ XSS
* Paste the attack string `<iframe src="javascript:alert(`xss`)">` into the Search... field.
* Click the Search button.
* An alert box with the text "xss" should appear.

![img](https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/appendix/img/xss1_alert.png)

#### 3. Gain access to any access log file of the server. ⭐️⭐️⭐️⭐ ️Sensitive Data Exposure

- Solve the [Access a confidential document](https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/appendix/solutions.html#access-a-confidential-document) or any related challenges which will bring the exposed `/ftp` folder to your attention.

- Visit http://localhost:3000/ftp and notice the file `incident-support.kdbx` which is needed for [Log in with the support team's original user credentials](https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/part2/security-misconfiguration.html#log-in-with-the-support-teams-original-user-credentials) and indicates that some support team is performing its duties from the public Internet and possibly with VPN access.

- Guess luckily or run a brute force attack with e.g. [OWASP ZAPs DirBuster plugin](https://github.com/zaproxy/zap-extensions/tree/beta/src/org/zaproxy/zap/extension/bruteforce) for a possibly exposed directory containing the log files.

- Following [the hint to drill down deeper than one level](https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/part2/sensitive-data-exposure.html#gain-access-to-any-access-log-file-of-the-server), you will at some point end up with http://localhost:3000/support/logs.

- Inside you will find at least one `access.log` of the current day. Open or download it to solve this challenge.

  ![Exposed folder containing access logs](https://bkimminich.gitbooks.io/pwning-owasp-juice-shop/content/appendix/img/access-log_folder.png)



