import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';

class ButtonWidgetSmall extends StatelessWidget {

  final onPressed;
  final String textName;

  const ButtonWidgetSmall({
    Key? key,
    required this.onPressed,
    required this.textName,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
  return SizedBox(
  child: TextButton(
  style:ButtonStyle(
  foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
  backgroundColor: MaterialStateProperty.all<Color>(Colors.green),
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
  style: TextStyle(
    color: Colors.white,
    fontSize: 13
  )),
  ),
  );
  }
}
