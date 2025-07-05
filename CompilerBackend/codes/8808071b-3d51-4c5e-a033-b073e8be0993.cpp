#include<bits/stdc++.h>
using namespace std;
int main(){
    int n;
    cin>>n;
    vector<int>arr(n);
    for(int i=0;i<n;i++)cin>>arr[i];
    int i=0;
    while(true){
        i++;
    }
    sort(arr.begin(),arr.end());
    cout<<arr[n-1]+arr[n-2]<<endl;
    return 0;
}