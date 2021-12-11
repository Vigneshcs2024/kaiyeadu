import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/component_widget/double_row_widget.dart';
import 'package:mobile/widgets/component_widget/single_column_widget.dart';
import 'package:mobile/widgets/component_widget/single_row_widget.dart';

class LinkWidget extends StatelessWidget {
  const LinkWidget({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(right: 8),
      decoration: expansionTileDecoration.copyWith(border: Border.all(color:beginColor,width: 2)),
      child: ExpansionTile(
        title: Text('LINKS ',style:heading5),
        childrenPadding: EdgeInsets.only(top: 0,right: 10,left: 10, bottom: 10),
        expandedAlignment: Alignment.topLeft,
        tilePadding: EdgeInsets.only(left: 10),
        iconColor: beginColor,
        collapsedIconColor: Colors.black,
        expandedCrossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[

      ListView.builder(
        shrinkWrap: true,
          itemCount: 5,
          itemBuilder: (BuildContext context,int index){
            return Text("Babu, S/o Asokkumar , Nochiayam\n",style:subhead1);
          }
          ),
        ],

      ),
    );
  }
}
