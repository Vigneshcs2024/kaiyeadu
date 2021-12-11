import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/component_widget/double_row_widget.dart';
import 'package:mobile/widgets/component_widget/single_column_widget.dart';
import 'package:mobile/widgets/component_widget/single_row_widget.dart';

class ContactDetails extends StatelessWidget {
  const ContactDetails({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(right: 8),
      decoration: expansionTileDecoration.copyWith(border: Border.all(color:beginColor,width: 2)),
      child: ExpansionTile(
        title: Text('CONTACT DETAILS ',style:heading5),
        childrenPadding: EdgeInsets.only(top: 0,right: 10,left: 10, bottom: 10),
        expandedAlignment: Alignment.topLeft,
        tilePadding: EdgeInsets.only(left: 10),
        iconColor: beginColor,
        collapsedIconColor: Colors.black,
        expandedCrossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          SingleColumnWidget(subtitle: "PRESENT ADDRESS",value: "Sanjai Gandhi Nagar,\nMannachanallur.",),
          SizedBox(height: 10,),
          SingleColumnWidget(subtitle: "CURRENT ADDRESS",value: "Sanjai Gandhi Nagar,\nMannachanallur.",),
          SizedBox(height: 10,),
          SingleRowWidget(subtitle: "PHONE NO: ",value: "9876543210",),
        ],

      ),
    );
  }
}
