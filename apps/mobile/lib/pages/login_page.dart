// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile/pages/otp_page.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/button_widget.dart';

class LoginPage extends StatefulWidget {
  static const String id = "LoginScreen";
  const LoginPage({Key? key}) : super(key: key);
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
     // resizeToAvoidBottomInset: false,
      body :  Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end:Alignment.bottomRight,
              colors: [
                beginColor,
                endColor
              ]
            )
          ),
          child: Padding(
            padding: const EdgeInsets.only(left: 25.0,right: 25.0,top: 35.0),
           // padding: const EdgeInsets.symmetric(vertical: 35.0,horizontal: 25.0),
            child: ListView(
              children: <Widget>[
                const SizedBox(height: 50,),
                Center(child: SizedBox(width: 169, height: 155,child: Image.asset('images/logo.png'))),
                const SizedBox(height: 35,),
                Center(child: Text('LOGIN',style: heading1,)),
                const SizedBox(height: 35,),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 20.0,horizontal: 15.0),
                  child:Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('GPF ID',style: heading2,),
                      const SizedBox(height: 15,),
                      TextField(
                        keyboardType: TextInputType.emailAddress,
                        decoration: kInputTextFieldDecoration.copyWith(hintText: 'Enter ID'),
                      ),

                      const SizedBox(height: 40,),
                      Center(
                        child: ButtonWidget(textName: "SEND OTP",onPressed: ()
                        {
                          Navigator.pushNamed(context, OtpPage.id);
                        },
                        ),
                      ),
                      const SizedBox(height: 25,),
                    ],
                  ),
                ),
              ],
            ),
          ),
      ),
    );
  }
}


