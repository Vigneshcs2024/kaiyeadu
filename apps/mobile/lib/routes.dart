import 'package:flutter/material.dart';
import 'package:mobile/pages/home_page.dart';
import 'package:mobile/pages/login_page.dart';
import 'package:mobile/pages/otp_page1.dart';
import 'package:mobile/pages/otp_page2.dart';
import 'package:mobile/pages/reset_password.dart';

class PageRoutes {
  Map<String, WidgetBuilder> routes() {
    return {
      HomePage.id: (context) => HomePage(),
      LoginPage.id: (context) => LoginPage(),
      OtpPage1.id: (context) => OtpPage1(),
      OtpPage2.id: (context) => OtpPage2(),
      ResetPassword.id: (context) => ResetPassword()
    };
  }
}
