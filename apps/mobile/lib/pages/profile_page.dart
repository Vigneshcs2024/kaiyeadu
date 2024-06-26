import 'package:flutter/cupertino.dart';
import "package:flutter/material.dart";
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/category_widget/contact_widget.dart';
import 'package:mobile/widgets/category_widget/family_widget.dart';
import 'package:mobile/widgets/category_widget/finance_widget.dart';
import 'package:mobile/widgets/category_widget/link_widget.dart';
import 'package:mobile/widgets/category_widget/other_details_widget.dart';
import 'package:mobile/widgets/category_widget/personal_widget.dart';

class ProfilePage extends StatefulWidget {
  static const String id = "ProfilePage";
  final data;
  const ProfilePage({this.data});
  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: -10,
        title: Text(widget.data["name"]),
        backgroundColor: beginColor,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            SizedBox(
              height: 270,
              width: double.infinity,
              //child: Image.asset('images/profile2.jpg',fit: BoxFit.cover,),
              child: Image.network(widget.data["image"],fit: BoxFit.cover,),
              ),
            SizedBox(height: 15,),
            Padding(
              padding: const EdgeInsets.only(left: 18,right: 18,bottom: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget> [
                  Text(widget.data["name"],style:heading3,),
                  SizedBox(height: 10,),
                  Text(widget.data["hs_number"],style: heading4,),
                  SizedBox(height: 10,),
                  Container(
                    height: 30,width: MediaQuery.of(context).size.width,
                    child: ListView(
                      shrinkWrap: true,
                      scrollDirection: Axis.horizontal,
                      children: <Widget>[
                        TagWidget(tagName: "Murder",),SizedBox(width: 10,),
                        TagWidget(tagName: "Robbery",),SizedBox(width: 10,),
                        TagWidget(tagName: "Rowdism",),
                      ],
                    ),
                  ),
                  SizedBox(height: 10,),
                  PersonalWidget(data: widget.data,),
                  SizedBox(height: 10,),
                  FamilyWidget(),
                  SizedBox(height: 10,),
                  ContactDetails(),
                  SizedBox(height:10),
                  FinanceWidget(),
                  SizedBox(height:10),
                  LinkWidget(),
                  SizedBox(height:10),
                  OtherDetailsWidget()
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}



class TagWidget extends StatelessWidget {

  final String tagName;
  TagWidget({required this.tagName});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(vertical: 5.0,horizontal: 10.0),
      child: Text(tagName,style:tagLine),
      decoration: containerDecoration ,
      //color: tagColor,
    );
  }
}
