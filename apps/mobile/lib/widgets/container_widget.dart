
import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/home_buttons.dart';

class ContainerWidget extends StatelessWidget {
  const ContainerWidget({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 5,
      child: Container(
        color: containerColor,
        padding: EdgeInsets.fromLTRB(25, 25, 25, 20),
        child: Column(
          children: <Widget>[
            // SizedBox(height: 25,),
            TextField(
              keyboardType: TextInputType.text,
              decoration: kSearchFieldDecoration,
            ),
            SizedBox(height: 15,),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                HomeButtonWidget(textName: "Sort", icon: Icon(Icons.sort_outlined, color: beginColor,),
                  onPressed: ()
                  {
                    // Navigator.pushNamed(context, OtpPage1.id);
                  },
                ),
                SizedBox(width: 11,),
                HomeButtonWidget(textName: "Filter",icon: Icon(Icons.filter_list_outlined, color: beginColor,),
                  onPressed: ()
                  {
                    // Navigator.pushNamed(context, OtpPage1.id);
                  },
                )
              ],
            ),
            SizedBox(height: 15,),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const <Widget>[
                Text("Showing "),
                Text("20 ",style:TextStyle(
                  fontWeight: FontWeight.bold,
                ),),
                Text("out of 20 records"),
              ],
            )
          ],
        ),
      ),
    );
  }
}
