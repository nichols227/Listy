//
//  HomeTableViewController.m
//  Listy
//
//  Created by Nick Scoliard on 1/13/16.
//  Copyright © 2016 Nick Scoliard. All rights reserved.
//

#import "HomeTableViewController.h"

@interface HomeTableViewController ()

@end

@implementation HomeTableViewController{
    NSArray *headers;
    NSArray *rowNames;
}

#define HEADER_HEIGHT 50
#define FIRST_NAV_COLOR [UIColor colorWithRed:40/255.0 green:197/255.0 blue:231/255.0 alpha:.8f].CGColor
#define LAST_NAV_COLOR [UIColor colorWithRed:0 green:153/255.0 blue:1 alpha:.8f].CGColor

- (void)viewDidLoad {
    [super viewDidLoad];
    
    CAGradientLayer* navGradient = [CAGradientLayer layer];
    CGRect tempFrame = self.navigationController.navigationBar.bounds;
    tempFrame.size.height += 20;
    navGradient.frame = tempFrame;
    navGradient.colors = @[ (id)FIRST_NAV_COLOR, (id)LAST_NAV_COLOR];
    navGradient.startPoint = CGPointMake(1, .5);
    navGradient.endPoint = CGPointMake(.5, .5);
    UIGraphicsBeginImageContext(navGradient.bounds.size);
    [navGradient renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *gradientImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    if (gradientImage != nil) {
        [self.navigationController.navigationBar setBackgroundImage:gradientImage forBarMetrics:UIBarMetricsDefault];
    } else {
        NSLog(@"Failure");
    }
    
    
    headers = [[NSArray alloc] initWithObjects:@"Personal", @"Groups", @"Benjamins", nil];
    
    self.navigationController.navigationBar.barTintColor = [UIColor colorWithRed:0 green:.5 blue:1.f alpha:1.f];
    CGFloat circleSize = 3 * self.navigationController.navigationBar.frame.size.height/2;
    UIView *picView = [[UIView alloc] initWithFrame:CGRectMake(self.navigationController.navigationBar.frame.size.width/2 - circleSize/2, self.navigationController.navigationBar.frame.size.height/6, circleSize, circleSize)];
    picView.layer.cornerRadius = circleSize/2;
    picView.backgroundColor = [UIColor whiteColor];
    UIImageView *imgView = [[UIImageView alloc] initWithFrame:CGRectMake(1.5, 1.5, circleSize - 3, circleSize - 3)];
    imgView.backgroundColor = [UIColor clearColor];
    imgView.image = [UIImage imageNamed:@"propic.jpg"];
    imgView.layer.cornerRadius = (circleSize - 3)/2;
    imgView.clipsToBounds = YES;
    imgView.backgroundColor = [UIColor clearColor];
    [picView addSubview:imgView];
    [self.navigationController.navigationBar addSubview:picView];
    
    
    if([self.tableView respondsToSelector:@selector(layoutMargins)]){
        self.tableView.layoutMargins = UIEdgeInsetsZero;
    }
    if([self.tableView respondsToSelector:@selector(setSeparatorInset:)]){
        [self.tableView setSeparatorInset:UIEdgeInsetsZero];
    }
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidLayoutSubviews{
    [super viewDidLayoutSubviews];
    if([self.tableView respondsToSelector:@selector(layoutMargins)]){
        self.tableView.layoutMargins = UIEdgeInsetsZero;
    }
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark Table View Data Source


-(CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section {
    return HEADER_HEIGHT;
}


-(UIView*)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section{
    UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0, 0, tableView.frame.size.width, HEADER_HEIGHT)];
    CALayer *topBorder = [CALayer layer];
    topBorder.backgroundColor = [UIColor colorWithRed:239.0/255.0 green:239.0/255.0 blue:239.0/255.0 alpha:.75].CGColor;
    CALayer *bottomBorder = [CALayer layer];
    bottomBorder.backgroundColor = [UIColor colorWithRed:239.0/255.0 green:239.0/255.0 blue:239.0/255.0 alpha:.75].CGColor;
    topBorder.frame = CGRectMake(0, 0, tableView.frame.size.width, 1.f);
    bottomBorder.frame = CGRectMake(0, view.frame.size.height - 1, tableView.frame.size.width, 1.f);
    [view.layer addSublayer:topBorder];
    [view.layer addSublayer:bottomBorder];

    UIView *labelView = [[UIView alloc] initWithFrame:CGRectMake(3.0*view.frame.size.width/4.0, view.frame.size.height/2.0, 3.0*view.frame.size.width/16.0, view.frame.size.height/2.0)];
    [labelView setBackgroundColor:[UIColor colorWithRed:239.0/255.0 green:239.0/255.0 blue:239.0/255.0 alpha:.75]];
    UILabel *label = [[UILabel alloc] init];
    [label setFont:[UIFont fontWithName:@"Arial" size:10.0]];
    [label setText:[headers objectAtIndex:section]];
    label.textAlignment = NSTextAlignmentCenter;
    CGRect howMuchSpace = [label.text boundingRectWithSize:labelView.frame.size options:NSStringDrawingUsesLineFragmentOrigin attributes:@{NSFontAttributeName : [UIFont fontWithName:@"Arial" size:10.0]} context:nil];
    label.frame = CGRectMake(13, 3, howMuchSpace.size.width, howMuchSpace.size.height);
    [labelView addSubview:label];
    [view addSubview:labelView];
    return view;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    
    return 3;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    
    if (section == 0) {
        return 2;
    } else if (section == 1){
        return 5;
    } else {
        return 1;
    }
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section{
    if (section == 0) {
        return @"Personal";
    } else if (section == 1){
        return @"Groups";
    } else {
        return @"Benjamins";
    }
}

- (UITableViewCell*)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    
    NSString *identifier = @"ItMe";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
    cell.textLabel.text = @"Pipe It Up";
    if([cell respondsToSelector:@selector(layoutMargins)]){
        cell.layoutMargins = UIEdgeInsetsZero;
    }
    if (indexPath.section == 0) {
        cell.imageView.image = [UIImage imageNamed:@"Checkbox"];
    }
    
    if (indexPath.section == 1) {
        cell.imageView.image = [UIImage imageNamed:@"Cart"];
        UIImageView *imgView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"Star"]];
        UIButton *btn = [[UIButton alloc] init];
        UIImage *star = [UIImage imageNamed:@"Star"];
        btn.frame = CGRectMake(0, 0, star.size.width, star.size.height);
        btn.tag = 0;
        [btn setBackgroundImage:star forState:UIControlStateNormal];
        btn.backgroundColor = [UIColor clearColor];
        [btn addTarget:self action:@selector(tappedImage:event:) forControlEvents:UIControlEventTouchUpInside];
        UIView *assec = [[UIView alloc] init];
        [assec addSubview:btn];
        cell.accessoryView = btn;
    }
    return cell;
}

- (void)tableView:(UITableView *)tableView accessoryButtonTappedForRowWithIndexPath:(NSIndexPath *)indexPath{
    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    UIButton *btn = cell.accessoryView;
    UIImage *newImg;
    if (btn.tag == 0) {
        newImg = [UIImage imageNamed:@"Filled Star"];
        btn.tag = 1;
    } else {
        newImg = [UIImage imageNamed:@"Star"];
        btn.tag = 0;
    }
    cell.accessoryView = btn;
    [UIView animateWithDuration:10.f animations:^{
        [btn setBackgroundImage:newImg forState:UIControlStateNormal];
    }];
    
}

- (void)showSettings{
    
}

- (void)tappedImage:(id)sender event:(id)event{
    NSSet *touches = [event allTouches];
    UITouch *touch = [touches anyObject];
    CGPoint currentTouch = [touch locationInView:self.tableView];
    NSIndexPath *indPath = [self.tableView indexPathForRowAtPoint:currentTouch];
    if (indPath != nil) {
        [self tableView:self.tableView accessoryButtonTappedForRowWithIndexPath:indPath];
    }
}

@end
