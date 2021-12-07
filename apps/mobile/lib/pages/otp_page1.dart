// ignore_for_file: use_key_in_widget_constructors, prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile/pages/otp_page2.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/button_widget.dart';
class OtpPage1 extends StatefulWidget {
  static const String id = "OTPScreen1";
  @override
  _OtpPage1State createState() => _OtpPage1State();
}

class _OtpPage1State extends State<OtpPage1> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: gradientBackground,
        child: Container(
            decoration: backgroundImage,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 0.0,horizontal: 25.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text('EMAIL ID',style: heading1,),
                const SizedBox(height: 15,),
                TextField(
                  keyboardType: TextInputType.emailAddress,
                  decoration: kInputTextFieldDecoration.copyWith(hintText: 'Enter your email'),
                ),
                const SizedBox(height: 40,),
                Center(
                  child: ButtonWidget(textName: "Get OTP",onPressed: (){
                    Navigator.pushNamed(context, OtpPage2.id);
                  },),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

