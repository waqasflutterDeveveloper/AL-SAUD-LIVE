// #import <UserNotifications/UNUserNotificationCenter.h>

#import <React/RCTBridgeDelegate.h>

#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
// @interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
