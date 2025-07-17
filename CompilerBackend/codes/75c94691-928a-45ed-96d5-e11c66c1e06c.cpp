#include<bits/stdc++.h>
using namespace std;
int main(){
    int n;
    cin>>n;
    vector<int>nums(n);
    for(int i=0;i<n;i++)cin>>nums[i];
    sort(nums.begin(),nums.end());
    cout<<nums[n-1]+nums[n-2]<<endl;
    return 0;
}