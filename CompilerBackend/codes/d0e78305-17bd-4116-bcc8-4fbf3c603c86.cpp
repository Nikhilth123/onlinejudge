
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int findMaxSumPair(const vector<int>& arr) {
    sort(arr.begin(),arr.end());
  return arr[n-1]+arr[n-2];
}
int main(){
    int n;
    cin>>n;
    vector<int>&arr(n);
    for(int i=0;i<n;i++)cin>>arr[i];
   cout<< findMaxSumPair(arr);
    
}