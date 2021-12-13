import "package:flutter/material.dart";
import 'package:mobile/utils/styles.dart';
class DoubleRowWidget extends StatelessWidget {

  final String subtitle1;
  final String value1;
  final String subtitle2;
  final String value2;
  DoubleRowWidget({required this.subtitle1,required this.value1,required this.subtitle2,required this.value2});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Text(subtitle1,style:subhead1,),SizedBox(width: 5.0,),Text(value1,style:subhead2,),
          ],
        ),
        Row(
          children: [
            Text(subtitle2,style:subhead1,),SizedBox(width: 5.0,),Text(value2,style:subhead2,),
          ],
        ),
      ],
    );
  }
}
