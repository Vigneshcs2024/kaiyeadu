// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile/pages/login_page.dart';
import 'package:mobile/pages/profile_page.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';
import 'package:mobile/widgets/container_widget.dart';
import 'package:mobile/widgets/home_buttons.dart';

class HomePage extends StatefulWidget {
  static const String id = 'HomeScreen';
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Kaiyeadu",
        ),
        //elevation: 0,
        backgroundColor: beginColor,
        actions: <Widget>[
          InkWell(
            splashColor: Colors.white,
            child: IconButton(
                icon: Icon(Icons.logout_outlined),
                onPressed: () {
                  //Implement logout functionality
                  Navigator.pushNamedAndRemoveUntil(context, LoginPage.id,(route)=>false);
                }),
          )
        ],
      ),
      body: Container(
        decoration: backgroundImage25,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            ContainerWidget(),
            Expanded(
              child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: 20,
                  itemBuilder: (BuildContext context,int index){
                    return InkWell(
                      splashColor: beginColor,
                      onTap: () {
                        Navigator.pushNamed(context, ProfilePage.id);
                      },
                      child: ListTile(
                        horizontalTitleGap: 1.0,
                    //    minLeadingWidth: 2.0,
                          leading: CircleAvatar(
                            radius: 40,
                            backgroundColor: Colors.white,
                            backgroundImage: AssetImage('images/profile.jpg'),
                          ),
                          trailing: Text("Open\nCase",
                            style: TextStyle(
                                color: Colors.green,fontSize: 13),),
                          title:Text("Lelouch Lamperouge"),
                        subtitle:Text("Mandaiyur Ps - HS No. 1234/80") ,
                      ),
                    );
                  }
              ),
            ),
          ],
        ),
      )
    );
  }
}


