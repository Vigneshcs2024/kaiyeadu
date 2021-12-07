// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile/pages/otp_page1.dart';
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
            padding: const EdgeInsets.symmetric(vertical: 0.0,horizontal: 25.0),
            child: ListView(
              children: <Widget>[
                const SizedBox(height: 50,),
                Center(child: SizedBox(width: 169, height: 155,child: Image.asset('images/logo.png'))),
                const SizedBox(height: 35,),
                Center(child: Text('LOGIN',style: heading1,)),
                const SizedBox(height: 35,),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 0.0,horizontal: 15.0),
                  child:Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('ID',style: heading2,),
                      const SizedBox(height: 15,),
                      TextField(
                        keyboardType: TextInputType.emailAddress,
                        decoration: kInputTextFieldDecoration.copyWith(hintText: 'Enter your email'),
                      ),
                      const SizedBox(height: 25,),
                      Text('Password',style: heading2,),
                      const SizedBox(height: 15,),
                      TextField(
                        keyboardType: TextInputType.visiblePassword,
                        obscureText: true,
                        enableSuggestions: false,
                        autocorrect: false,
                        decoration: kInputTextFieldDecoration.copyWith(hintText: 'Enter Password'),
                      ),
                      const SizedBox(height: 40,),
                      Center(
                        child: ButtonWidget(textName: "LOGIN",onPressed: ()
                        {
                          Navigator.pushNamed(context, OtpPage1.id);
                        },
                        ),
                      ),
                      const SizedBox(height: 25,),
                      Center(child: Text("Forgot Password?",style: button,))
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


