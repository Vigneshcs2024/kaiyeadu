// ignore_for_file: prefer_const_constructors, prefer_const_constructors_in_immutables, prefer_typing_uninitialized_variables

import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';

class ButtonWidget extends StatelessWidget {

  final String textName;
  final  onPressed;
  ButtonWidget({Key? key, required this.textName,required this.onPressed}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 187,
      height: 48,
      child: TextButton(
        style:ButtonStyle(
            foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
            backgroundColor: MaterialStateProperty.all<Color>(beginColor),
            elevation: MaterialStateProperty.all(5),
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(25.0),
                  // side: BorderSide(color: Colors.white)
                )
            )
        ),
        onPressed: onPressed,
        child: Text(textName,
            style: button),
      ),
    );
  }
}


