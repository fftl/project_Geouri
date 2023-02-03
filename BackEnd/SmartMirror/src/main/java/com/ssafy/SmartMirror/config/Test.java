package com.ssafy.SmartMirror.config;

import java.util.Random;

public class Test {
    public static void main(String[] args){
        System.out.println(getRandomPassword(16));
    }

    public static String getRandomPassword( int length ){
        char[] charaters = {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'};
        StringBuffer sb = new StringBuffer();
        Random rn = new Random();
        for( int i = 1 ; i < length+1 ; i++ ){
            sb.append( charaters[ rn.nextInt( charaters.length )] );
            if(i%4==0 && i != length) sb.append("-");

        }
        return sb.toString();
    }
}
