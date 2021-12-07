
import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';

class HomeButtonWidget extends StatelessWidget {

  final String textName;
  final icon;
  final  onPressed;
  HomeButtonWidget({Key? key, required this.textName,required this.onPressed,required this.icon}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 139,
      height: 42,
      child: TextButton(
        style:ButtonStyle(
            foregroundColor: MaterialStateProperty.all<Color>(beginColor),
            backgroundColor: MaterialStateProperty.all<Color>(containerColor),
            elevation: MaterialStateProperty.all(3),
            //shadowColor: MaterialStateProperty.all<Color>(Colors.white),
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(25.0),
                   side: const BorderSide(color: beginColor, width: 2.0)
                )
            )
        ),
        onPressed: onPressed,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            icon,
            const SizedBox(width: 10.0,),
            Text(textName,
                style: const TextStyle(
                  color: beginColor,
                  fontSize: 14
                )),
          ],
        ),
      ),
    );
  }
}
