import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/component_widget/double_row_widget.dart';
import 'package:mobile/widgets/component_widget/single_column_widget.dart';
import 'package:mobile/widgets/component_widget/single_row_widget.dart';

class FinanceWidget extends StatelessWidget {
  const FinanceWidget({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(right: 8),
      decoration: expansionTileDecoration.copyWith(border: Border.all(color:beginColor,width: 2)),
      child: ExpansionTile(
        title: Text('FINANCE DETAILS ',style:heading5),
        childrenPadding: EdgeInsets.only(top: 0,right: 10,left: 10, bottom: 10),
        expandedAlignment: Alignment.topLeft,
        tilePadding: EdgeInsets.only(left: 10),
        iconColor: beginColor,
        collapsedIconColor: Colors.black,
        expandedCrossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          SingleColumnWidget(subtitle: "BANK ACCOUNT NO:",value: "CNRB12345678",),
          SizedBox(height: 10,),
          SingleColumnWidget(subtitle: "SOURCE OF INCOME & PRESENT OCCUPATION:",value: "Real estate, kandhu vati, agriculture",),
        ],

      ),
    );
  }
}


