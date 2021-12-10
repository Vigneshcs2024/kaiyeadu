import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/component_widget/double_row_widget.dart';
import 'package:mobile/widgets/component_widget/single_column_widget.dart';
import 'package:mobile/widgets/component_widget/single_row_widget.dart';

class PersonalWidget extends StatelessWidget {
  final data;
  PersonalWidget({ this.data});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(right: 8),
      decoration: expansionTileDecoration.copyWith(border: Border.all(color:beginColor,width: 2)),
      child: ExpansionTile(
        title: Text('PERSONAL DETAILS ',style:heading5),
        childrenPadding: EdgeInsets.only(top: 0,right: 10,left: 10, bottom: 10),
        expandedAlignment: Alignment.topLeft,
        tilePadding: EdgeInsets.only(left: 10),
        initiallyExpanded: true,
        iconColor: beginColor,
        collapsedIconColor: Colors.black,
        expandedCrossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          SingleColumnWidget(subtitle: "FATHER'S NAME:",value: data["father"],),
          SizedBox(height: 10,),
          DoubleRowWidget(subtitle1:"D.O.B:",value1: data["dob"],subtitle2: "Age",value2: data["age"].toString(),),
          SizedBox(height: 10,),
          DoubleRowWidget(subtitle1:"RELIGION",value1: data["religion"],subtitle2: "CASTE",value2: data["caste"],),
          SizedBox(height: 10,),
          SingleRowWidget(subtitle: "MARTIAL STATUS",value: data["martial_status"],),
          SizedBox(height: 10,),
          SingleRowWidget(subtitle: "HEIGHT",value: data["height"].toString(),),
          SizedBox(height: 10,),
          SingleColumnWidget(subtitle: "IDENTIFICATION MARK: ",value: data["identification_mark"],),
          //SingleColumnWidget(subtitle: "FATHER'S NAME:",value: "KING LAMPEROUGE",),
          // SizedBox(height: 10,),
          // DoubleRowWidget(subtitle1:"D.O.B:",value1: "7/05/2001",subtitle2: "Age",value2: "21",),
          // SizedBox(height: 10,),
          // DoubleRowWidget(subtitle1:"RELIGION",value1: "Hindu",subtitle2: "CASTE",value2: "SC/PL",),
          // SizedBox(height: 10,),
          // SingleRowWidget(subtitle: "MARTIAL STATUS",value: "Married",),
          // SizedBox(height: 10,),
          // SingleRowWidget(subtitle: "HEIGHT",value: "170 cm",),
          // SizedBox(height: 10,),
          // SingleColumnWidget(subtitle: "IDENTIFICATION MARK: ",value: "A Scar on the left siide of the forehead",),
        ],

      ),
    );
  }
}
