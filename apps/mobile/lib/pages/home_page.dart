// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
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
          IconButton(
              icon: Icon(Icons.power_settings_new_outlined),
              onPressed: () {
                //Implement logout functionality
                print('Clear Button');
              })
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          ContainerWidget(),
          Expanded(
            child: Container(
              child: ListView.builder(
                  shrinkWrap: true,
                  itemCount: 20,
                  itemBuilder: (BuildContext context,int index){
                    return ListTile(
                        leading: Image.asset('images/logo.png'),
                        trailing: Text("Open\nCase",
                          style: TextStyle(
                              color: Colors.green,fontSize: 13),),
                        title:Text("Katy Perry"),
                      subtitle:Text("Mandaiyur Ps - HS No. 1234/80") ,
                    );
                  }
              ),
            ),
          ),
        ],
      )
    );
  }
}


