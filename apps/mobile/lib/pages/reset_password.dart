// ignore_for_file: use_key_in_widget_constructors, prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/button_widget.dart';
class ResetPassword extends StatefulWidget {
  static const String id = "ResetPassword";
  @override
  _ResetPasswordState createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
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
                Center(child: Text('RESET PASSWORD',style: heading1,)),
                const SizedBox(height: 60,),
                Text('NEW PASSWORD',style: heading2,),
                const SizedBox(height: 15,),
                TextField(
                  keyboardType: TextInputType.visiblePassword,
                  obscureText: true,
                  enableSuggestions: false,
                  autocorrect: false,
                  decoration: kInputTextFieldDecoration.copyWith(hintText: 'Enter Password'),
                ),
                const SizedBox(height: 40,),
                Text('CONFIRM PASSWORD',style: heading2,),
                const SizedBox(height: 15,),
                TextField(
                  keyboardType: TextInputType.visiblePassword,
                  obscureText: true,
                  enableSuggestions: false,
                  autocorrect: false,
                  decoration: kInputTextFieldDecoration.copyWith(hintText: 'Re-Enter Password'),
                ),
                const SizedBox(height: 40,),
                Center(
                  child: ButtonWidget(textName: "SUBMIT",onPressed: (){

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
