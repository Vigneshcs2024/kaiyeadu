// ignore_for_file: prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';
import 'package:mobile/utils/styles.dart';

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
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: <Widget>[
          Container(
            color: containerColor,
            padding: EdgeInsets.all(25),
            child: Column(
              children: <Widget>[
               // SizedBox(height: 25,),
                TextField(
                  keyboardType: TextInputType.text,
                  decoration: kSearchFieldDecoration,
                ),
                SizedBox(height: 15,),
                Row(
                  children: [
                    
                  ],
                )
              ],
            ),
          )
        ],
      )
    );
  }
}
