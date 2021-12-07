// ignore_for_file: use_key_in_widget_constructors, prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile/pages/reset_password.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/button_widget.dart';
class OtpPage2 extends StatefulWidget {
  static const String id = "OTPScreen2";
  @override
  _OtpPage2State createState() => _OtpPage2State();
}

class _OtpPage2State extends State<OtpPage2> {
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
                Text('ENTER OTP',style: heading1,),
                const SizedBox(height: 15,),
                TextField(
                  keyboardType: TextInputType.number,
                  decoration: kInputTextFieldDecoration.copyWith(hintText: 'Enter OTP'),
                ),
                const SizedBox(height: 40,),
                Center(
                  child: ButtonWidget(textName: "SUBMIT",onPressed: (){
                    Navigator.pushNamed(context, ResetPassword.id);
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

