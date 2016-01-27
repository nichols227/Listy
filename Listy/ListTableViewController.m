//
//  HomeTableViewController.m
//  Listy
//
//  Created by Nick Scoliard on 1/13/16.
//  Copyright © 2016 Nick Scoliard. All rights reserved.
//

#import "ListTableViewController.h"

@interface ListTableViewController ()

@end

@implementation ListTableViewController{
    NSArray *headers;
    NSArray *rowNames;
}

#define HEADER_HEIGHT 50
#define FIRST_NAV_COLOR [UIColor colorWithRed:40/255.0 green:197/255.0 blue:231/255.0 alpha:.8f].CGColor
#define LAST_NAV_COLOR [UIColor colorWithRed:0 green:153/255.0 blue:1 alpha:.8f].CGColor

- (void)viewDidLoad {
    [super viewDidLoad];
    
    
    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
    
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

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView{
    
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    
    return 1;
}

- (UITableViewCell*)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath{
    
    
    NSString *identifier = @"Shmover";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
    cell.textLabel.text = @"Pipe It Up";

    cell.imageView.image = [UIImage imageNamed:@"Box"];

    return cell;
}

/*- (void)tableView:(UITableView *)tableView accessoryButtonTappedForRowWithIndexPath:(NSIndexPath *)indexPath{

}*/

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    NSLog(@"trt");
}


@end
