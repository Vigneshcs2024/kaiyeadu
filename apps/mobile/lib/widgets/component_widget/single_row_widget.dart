import 'package:flutter/material.dart';
import 'package:mobile/utils/styles.dart';
class SingleRowWidget extends StatelessWidget {

  final String subtitle;
  final String value;
  SingleRowWidget({required this.subtitle,required this.value});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(subtitle,style:subhead1,), SizedBox(width: 5.0,),Expanded(flex: 1,child: Text(value,style:subhead2,)),
      ],
    );
  }
}
