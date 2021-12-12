import 'package:flutter/material.dart';
import 'package:mobile/pages/home_page.dart';
import 'package:mobile/pages/login_page.dart';
import 'package:mobile/pages/otp_page.dart';
import 'package:mobile/pages/profile_page.dart';


class PageRoutes {
  Map<String, WidgetBuilder> routes() {
    return {
      HomePage.id: (context) => HomePage(),
      LoginPage.id: (context) => LoginPage(),
      OtpPage.id: (context) => OtpPage(),
      ProfilePage.id: (context) => ProfilePage()
    };
  }
}
