# Hoof
This project contains scripts for bootstrapping a new AWS account using the AWS CDK.

---
# AWS Organization Setup
This tutorial documents how to set up a new AWS organization from scratch.  We will start by setting
up a root account for managing billing and then create a separate prod account for managing AWS 
resources.

## Prerequisites
1. An email address to use as the root account admin.  You will use this email to log in to AWS to 
   manage billing etc.
2. An email address to use as the prod account admin.  You will also use this email to create 
   an IAM user for bootstrapping the cross-account role.
3. An email address to use as the developer user.  Once the initial bootstrapping is complete, 
   this is the email attached to the IAM user you will use for day-to-day AWS work.
4. AWS CLI installed on all dev machines.  Follow the instructions here: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-docker.html

Ideally, each email will belong to a different person.  If you are setting up an organization for a 
small team and don't have three different people you can use the Gmail "+" feature to simulate 
multiple email addresses.  For example, if your email address is `user@example.com` you can use 
`user+root@example.com` as for the root account, `user+prod@example.com` for the prod account and 
`user@example.com` as the day-to-day account.  AWS will see these as distinct email addresses but 
Gmail will send all emails to the `user@example.com` inbox.

## Root Account Setup
1. Sign up for AWS using the email address you selected as the root account admin.
2. After signing up, log in to the AWS console using the new account.
3. You will receive a verification email.  Click on the link in the email to verify the account.  The account is now active. 
4. Record the user credentials and account number.
   
## Prod Account Setup
1. Sign up for AWS using the email address you selected as the prod account admin.
2. After signing up, log in to the AWS console using the new account.
3. You will receive a verification email.  Click on the link in the email to verify the account.  The account is now active.
4. Record the user credentials and account number.

## Organization Setup
1. Log in to the AWS console using the root account.
2. In the top right of the screen, click on your company name to open the account drop-down and click on "My Organization".
4. On the AWS Organizations page, click on "Create Organization", then click on "Invite Organization" in the modal.
5. You will see a table with your account listed.  Click on "Add Account" then click on "Invite Account".
6. Invite the prod account to your organization using the prod admin email.
7. Log out and log back in as the prod account.
8. The prod admin will receive an invite email.  Make sure you are logged in to AWS as the prod account and then click on the link to accept the invite.

## Developer IAM User Setup
1. Logged in as the root admin account, go to the IAM dashboard.
2. Click on "Users" in the sidebar to go to the user management dashboard.
3. Click on "Add user".
4. Enter the developer email address as the "User name" and enable both "Programmatic access" and "AWS Management Console access".  Use an auto-generated password and require a password reset.
5. On the next page you will be asked to add the user to groups.  Click the "Create group" button to open a modal.
6. In the modal, enter "Administrator" as the "Group name" and choose the default AdministratorAccess policy from the table and save the group.
7. Click the "Create group" button again and create another group named "AllUsers" with no policy attached.
8. Click "Next" to proceed to the Tags page.  Tags are not required so you can skip to the Review step.
9. Click "Create user".  You will land on a page showing the new user and their credentials.  Record the access key id, secret access key, and password then click the "Send email link" under "Email login instructions" column before closing the page.
10. Log out and then log back in as the new IAM user using the root account id and the credentials for the new IAM user you just made.
11. You will be asked to change the password.  Note that you will need the original auto generated password for this step so make sure not to lose it!
12. Logged in as the prod IAM user, go to the IAM dashboard and click on "Users" in the sidebar to go to the user management dashboard.
13. Click on the user to go to User Summary page.
14. Click on the "Security Credentials" tab.
15. Under the "Sign-in credentials" section, find the "Assigned MFA Device" label and click the "Manage" link to open the Manage MFA Device modal.
16. Follow the instructions to set up MFA using the Google Authenticator app on your phone.
17. After setting up the MFA device, sign out and sign back in as the developer IAM user.  You should be prompted to enter an MFA code now.

## Developer CLI Profile Setup
1. In your terminal, run `aws configure` and enter the access key id and secret access key that were generated when you created the IAM user (step 9 above) as well as the default region and output (you can use "us-east-1" and "json").
1a. If you use this machine with multiple AWS organizations, you should run `aws configure --orgname` instead, where `orgname` is the name of the organization you are setting up here.
2. Optionally, you can add an alias to your profile to make it easier to switch to this profile.  For example, `alias awsorgname='export AWS_PROFILE=orgname`, where `orgname` is the name of the organization you are setting up here.

## Prod IAM User Setup
1. Log in as the prod admin account, go to the IAM dashboard.
2. Click on "Users" in the sidebar to go to the user management dashboard.
3. Click on "Add user".
4. Enter the prod admin email address as the "User name" and enable both "Programmatic access" and "AWS Management Console access".  Use an auto-generated password and require a password reset.
5. On the next page you will be asked to add the user to groups.  Click the "Create group" button to open a modal.
6. In the modal, enter "Administrator" as the "Group name" and choose the default AdministratorAccess policy from the table and save the group.
7. Click the "Create group" button again and create another group named "AllUsers" with no policy attached.
8. Click "Next" to proceed to the Tags page.  Tags are not required so you can skip to the Review step.
9. Click "Create user".  You will land on a page showing the new user and their credentials.  Record the access key id, secret access key, and password then click the "Send email link" under "Email login instructions" column before closing the page.
10. Log out and then log back in as the new IAM user using the prod account id and the credentials for the new IAM user you just made.
11. You will be asked to change the password.  Note that you will need the original auto generated password for this step so make sure not to lose it!
12. Logged in as the prod IAM user, go to the IAM dashboard and click on "Users" in the sidebar to go to the user management dashboard.
13. Click on the user to go to User Summary page.
14. Click on the "Security Credentials" tab.
15. Under the "Sign-in credentials" section, find the "Assigned MFA Device" label and click the "Manage" link to open the Manage MFA Device modal.
16. Follow the instructions to set up MFA using the Google Authenticator app on your phone.
17. After setting up the MFA device, sign out and sign back in as the prod IAM user.  You should be prompted to enter an MFA code now.

## Prod CLI Profile Setup
1. In your terminal, run `aws configure --orgname-prod`, where `orgname` is the name of the organization you are setting up here, and enter the access key id and secret access key that were generated when you created the IAM user (step 9 above) as well as the default region and output (you can use "us-east-1" and "json").
2. Optionally, you can add an alias to your profile to make it easier to switch to this profile.  For example, `alias orgnameprod='export AWS_PROFILE=orgname-prod`.

---
# Cross Account Role Setup
Now that you have created the AWS accounts and IAM users the next step is to set up a cross-account 
role.  This will allow you to log in as a single IAM user (the developer user) and switch roles to 
manage resources in the two accounts.

## Prod Role Setup
1. Edit `lib/config.ts` in the project to add the name of the organization, root and production account ids, and region to the Config constructor.
2. In your terminal, switch to the prod profile: `export AWS_PROFILE=orgname-prod`
3. Deploy the developer-role stack to the prod account: `cdk deploy developer-role --parameters environmentName=prod`
4. You will be asked to review and confirm the change.
5. Log in to the AWS console as the prod IAM user and go to the Cloudformation dashboard.
6. You should see the `developer-role` stack.  Verify that it created successfully.

## Prod Group Setup
1. In your terminal, switch to the root profile you created in the "Developer CLI Profile Setup" step 1: `export AWS_PROFILE=default` or `export AWS_PROFILE=orgname`.
2. Deploy the developer-group stack to the root account: `cdk deploy developer-group-prod --parameters environmentName=prod --parameters targetAccount=<prod account id> --parameters users=<dev IAM user email>`.
3. You will be asked to review and confirm the change.
4. Log in to the AWS console as the developer IAM user using the root account id.
5. Go to the Cloudformation dashboard.  You should see the `developer-group-prod` stack.  Verify that it created successfully.

## Developer Role Switching
1. Log in to the AWS console as the developer IAM user.
2. Click on your user name in the top right of the screen to open the account drop down and click on "Switch Roles"
3. Enter the prod account id and the role name (should be "orgname-prod" where "orgname" is the name of your organization) as both the "Role" and "Display Name".
4. Click the "Switch Role" button.  You should now be viewing the console as the prod account.
5. Go to the Cloudformation dashboard.  You should see the `developer-role` stack.
6. Click on the prod role in the top right of the screen and click on "Back to <IAM user name>" to switch back to the root account.  You should see the `developer-group-prod` stack on the Cloudformation dashboard.

---
# Ops Tools Setup
Now that you have set up your AWS Organization and Accounts and can log in a switch roles, the next 
step is to start creating your infrastructure.
