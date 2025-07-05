def max_sum_two_elements_sort(arr):
    if len(arr) < 2:
        return "Array must contain at least two elements"
    
    arr.sort(reverse=True)  # Sort in descending order
    return arr[0] + arr[1]

# Example usage:
my_array = [12, 34, 10, 6, 40]
print(f"Maximum sum (sorting): {max_sum_two_elements_sort(my_array)}") 