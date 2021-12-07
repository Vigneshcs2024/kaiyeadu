// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import 'package:mobile/utils/Color.dart';

const TextStyle heading1 = TextStyle(fontSize: 24, color: Colors.white, fontWeight: FontWeight.bold); //Login,email-ID,OTP
const TextStyle heading2 = TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.w200); // Id, Password ,New and Confirm Password
const TextStyle heading3 =  TextStyle(fontSize: 24, color: Colors.black, fontWeight: FontWeight.bold); //medium  //Criminals Name
const TextStyle heading4 = TextStyle(fontSize: 18, color: Colors.black, fontWeight: FontWeight.w400); //semi-bold //HS Number
const TextStyle heading5 =  TextStyle(fontSize: 18, color: Colors.black, fontWeight: FontWeight.bold); //Details
const TextStyle subhead1 = TextStyle(fontSize: 14, color: Colors.black, fontWeight: FontWeight.w600); //sub Details
const TextStyle subhead2 =  TextStyle(fontSize: 14, color: Colors.black, fontWeight: FontWeight.w400); //content

const TextStyle button = TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.bold);
const TextStyle body1 = TextStyle(fontSize: 18, color: Colors.black, fontWeight: FontWeight.w400); //regular/normal/plainconst
const TextStyle body2 = TextStyle(fontSize: 15, color: Colors.black, fontWeight: FontWeight.w400); //medium

const TextStyle other = TextStyle(fontSize: 14, color: Colors.black, fontWeight: FontWeight.w400); //other
const BoxDecoration gradientBackground = BoxDecoration(
  gradient: LinearGradient(
    begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [
        beginColor,
        endColor
      ]
  )
);

const BoxDecoration backgroundImage = BoxDecoration(
    image: DecorationImage(
        image: AssetImage('images/logoWithOpacity.png'),
        fit: BoxFit.fitWidth
    )
);



const kSearchFieldDecoration = InputDecoration(
  hintText: 'Search',
  suffixIcon: Icon(Icons.search, color: beginColor,),
 hintStyle: TextStyle(
   fontStyle: FontStyle.italic,
     color: Colors.black
 ),
 // fillColor: Colors.white,
 // filled: true,
  contentPadding:
  EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
  border: OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(40.0)),
  ),
  enabledBorder: OutlineInputBorder(
    borderSide:
    BorderSide(color: beginColor, width: 2.0),
    borderRadius: BorderRadius.all(Radius.circular(40.0)),
  ),
  focusedBorder: OutlineInputBorder(
    borderSide:
    BorderSide(color: beginColor, width: 2.0),
    borderRadius: BorderRadius.all(Radius.circular(40.0)),
  ),
);

const kInputTextFieldDecoration = InputDecoration(
  hintText: 'Enter the value.',
  hintStyle: TextStyle(
    fontStyle: FontStyle.italic,
    color: beginColor
  ),
  fillColor: Colors.white,
  filled: true,
  contentPadding:
  EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
  border: OutlineInputBorder(
    borderRadius: BorderRadius.all(Radius.circular(5.0)),
  ),
  enabledBorder: OutlineInputBorder(
    borderSide:
    BorderSide(color: Colors.white, width: 1.0),
    borderRadius: BorderRadius.all(Radius.circular(5.0)),
  ),
  focusedBorder: OutlineInputBorder(
    borderSide:
    BorderSide(color: Colors.white, width: 2.0),
    borderRadius: BorderRadius.all(Radius.circular(5.0)),
  ),
);

// final TextTheme textTheme = TextTheme(
//     button: TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.bold, letterSpacing: 1),
//     headline2: TextStyle(fontSize: 24, color: Colors.white, fontWeight: FontWeight.w400), // Id, Password ,New and Confirm Password
//     headline1: TextStyle(fontSize: 24, color: Colors.white, fontWeight: FontWeight.bold), //Login,email-ID,OTP
//     headline5: TextStyle(fontSize: 24, color: Colors.black, fontWeight: FontWeight.bold), //medium  //Criminals Name
//     headline4: TextStyle(fontSize: 18, color: Colors.black, fontWeight: FontWeight.w400), //semi-bold //HS Number
//
//     headline3: TextStyle(fontSize: 18, color: Colors.black, fontWeight: FontWeight.bold), //Details
//     subtitle1: TextStyle(fontSize: 14, color: Colors.black, fontWeight: FontWeight.w600), //sub Details
//     subtitle2: TextStyle(fontSize: 14, color: Colors.black, fontWeight: FontWeight.w400), //content
//
//     bodyText1: TextStyle(fontSize: 18, color: Colors.black, fontWeight: FontWeight.w400), //regular/normal/plain
//     bodyText2: TextStyle(fontSize: 15, color: Colors.black, fontWeight: FontWeight.w400), //medium
//
//
//
//     caption: TextStyle(fontSize: 14, color: Colors.black, fontWeight: FontWeight.w400, letterSpacing: 0.2)); //other
