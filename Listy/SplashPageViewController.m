//
//  UIViewController+SplashPageViewController.m
//  Listy
//
//  Created by Nicholas Irwin Scoliard on 1/22/16.
//  Copyright © 2016 Nick Scoliard. All rights reserved.
//

#import "SplashPageViewController.h"

@implementation SplashPageViewController

#define FIRST_NAV_COLOR [UIColor colorWithRed:40/255.0 green:197/255.0 blue:231/255.0 alpha:.8f].CGColor
#define LAST_NAV_COLOR [UIColor colorWithRed:0 green:153/255.0 blue:1 alpha:.8f].CGColor


-(void)viewDidLoad{
    [super viewDidLoad];
    
    CAGradientLayer* navGradient = [CAGradientLayer layer];
    CGRect tempFrame = self.view.bounds;
    navGradient.frame = tempFrame;
    navGradient.colors = @[ (id)FIRST_NAV_COLOR, (id)LAST_NAV_COLOR];
    navGradient.startPoint = CGPointMake(1, 1);
    navGradient.endPoint = CGPointMake(.5, .5);
    UIGraphicsBeginImageContext(navGradient.bounds.size);
    [navGradient renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *gradientImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    if (gradientImage != nil) {
        [self.view setBackgroundColor:[UIColor colorWithPatternImage:gradientImage]];
    } else {
        NSLog(@"Failure");
    }
}

@end
