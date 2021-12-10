import "package:flutter/material.dart";
import 'package:mobile/utils/styles.dart';

class SingleColumnWidget extends StatelessWidget {

  final String subtitle;
  final String value;

  SingleColumnWidget({required this.subtitle, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(subtitle,style:subhead1,),
        SizedBox(height: 5.0,),
        Flexible(flex:1,child: Text(value,style:subhead2,)),
      ],
    );
  }
}
