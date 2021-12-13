import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/component_widget/double_row_widget.dart';
import 'package:mobile/widgets/component_widget/single_column_widget.dart';
import 'package:mobile/widgets/component_widget/single_row_widget.dart';

class OtherDetailsWidget extends StatelessWidget {
  const OtherDetailsWidget({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(right: 8),
      decoration: expansionTileDecoration.copyWith(border: Border.all(color:beginColor,width: 2)),
      child: ExpansionTile(
        title: Text('OTHER DETAILS ',style:heading5),
        childrenPadding: EdgeInsets.only(top: 0,right: 10,left: 10, bottom: 10),
        expandedAlignment: Alignment.topLeft,
        tilePadding: EdgeInsets.only(left: 10),
        iconColor: beginColor,
        collapsedIconColor: Colors.black,
        expandedCrossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          SingleColumnWidget(subtitle: "OPERATION PLACES",value: "Trichy, Salem, Villupuram, Kancheepuuram, Madurai, Namakkal, karur",),
          SizedBox(height: 10,),
          SingleColumnWidget(subtitle: "ADVOCATE NAME",value: "Mahendran",),
          SizedBox(height: 10,),
          SingleColumnWidget(subtitle: "TYPE OF VEHICLE USED & VEHICLE REGISTRATION NO. :-",value: "-------",),
          SizedBox(height: 10,),
          SingleColumnWidget(subtitle: "LAST ARREST CR.NO & DATE:",value: "Manachanallur PS Cr.No. 11/17, U/s 392 r/w 397 IPC on 07.01.17",),
        ],

      ),
    );
  }
}
